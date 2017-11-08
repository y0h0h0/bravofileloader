;(function() {
  window.bravofileloader = function(selector, settings, callbacks) {
    selector = selector || '';
    settings = settings || {};
    callbacks = callbacks || {};

    function runcb(cb, d1, d2) {
      if (typeof cb === 'function') cb(d1, d2)
    }

    function fileuploadr(file, callbacks) {
      if (settings.maxsize && file.size > settings.maxsize) {
        runcb(callbacks.toobig, file.size);
        return;
      }

      var xhr = new XMLHttpRequest();
      xhr.onload = xhr.onerror = function() {
        if (this.status === 200) {
          runcb(callbacks.done, xhr.response);
        } else {
          runcb(callbacks.error, this.status);
        }
      };

      xhr.upload.onprogress = function(event) {
        runcb(callbacks.progress, event.loaded, event.total);
        if (event.loaded === event.total) runcb(callbacks.loaded);
      }

      var fd = new FormData();
      fd.append(settings.name || 'file', file);
      for (var k in settings.data) fd.append(k, settings.data[k]);

      xhr.open("POST", settings.path || '', true);
      xhr.send(fd);
      runcb(callbacks.start);
    }

    var elem;
    if(typeof selector==='string') elem = document.querySelector(selector);
    else elem = selector;
    if (elem === null) return;

    elem.addEventListener('click', function(event) {
      var filer = document.createElement('input');
      filer.setAttribute('type', 'file');
      filer.click();
      filer.addEventListener('change', function(event) {
        fileuploadr(this.files[0], callbacks);
        filer.remove();
        return false;
      }, false);
    }, false);

    if (settings.drop) {
      if (settings.hoverclass) {
        elem.addEventListener("dragenter", dragenter, false);
        elem.addEventListener("dragleave", dragleave, false);

        function dragenter(e) {
          e.stopPropagation();
          e.preventDefault();
          elem.classList.add(settings.hoverclass);
        }

        function dragleave(e) {
          e.stopPropagation();
          e.preventDefault();
          elem.classList.remove(settings.hoverclass);
        }
      }

      elem.addEventListener("dragover", function(e) {
        e.stopPropagation();
        e.preventDefault();
      }, false);
      elem.addEventListener("drop", function(event) {
        if (settings.hoverclass) elem.classList.remove(settings.hoverclass);
        event.preventDefault();
        var files = event.dataTransfer.files;
        if (files[0] && files[0].type !== '') fileuploadr(files[0], callbacks);
      }, true);
    }
  }
})();
