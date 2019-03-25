// File Upload

function fileUpload() {
  function Init() {
    const fileSelect = document.querySelector('#file-upload');
    const fileDrag = document.querySelector('#file-drag');

    fileSelect.addEventListener('change', fileSelectHandler, false);
    fileDrag.addEventListener('dragover', fileDragHover, false);
    fileDrag.addEventListener('dragleave', fileDragHover, false);
    fileDrag.addEventListener('drop', fileSelectHandler, false);
  }

  function fileDragHover(e) {
    const fileDrag = document.querySelector('#file-drag');

    e.stopPropagation();
    e.preventDefault();

    fileDrag.className = e.type === 'dragover' ? 'hover' : 'modal-body file-upload';
  }

  function fileSelectHandler(e) {
    const files = e.target.files || e.dataTransfer.files;

    fileDragHover(e);

    for (let i = 0, f; (f = files[i]); i++) {
      parseFile(f);
    }
  }

  function output(msg) {
    const m = document.querySelector('#messages');
    m.innerHTML = msg;
  }

  function parseFile(file) {
    output('<strong>' + encodeURI(file.name) + '</strong>');

    const imageName = file.name;

    const isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);

    if (isGood) {
      document.querySelector('#start').classList.add('hidden');
      document.querySelector('#response').classList.remove('hidden');
      document.querySelector('#notimage').classList.add('hidden');
      document.querySelector('#file-image').classList.remove('hidden');
      document.querySelector('#file-image').src = URL.createObjectURL(file);
    } else {
      document.querySelector('#file-image').classList.add('hidden');
      document.querySelector('#notimage').classList.remove('hidden');
      document.querySelector('#start').classList.remove('hidden');
      document.querySelector('#response').classList.add('hidden');
      document.querySelector('#file-upload-form').reset();
    }
  }

  if (window.File && window.FileReader && window.FileList) {
    Init();
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
}

fileUpload();
