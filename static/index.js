const dropArea = document.getElementById('dv');
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});
dropArea.addEventListener('drop', handleDrop, false);
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}
function highlight() {
    dropArea.classList.add('dragover');
}
function unhighlight() {
    dropArea.classList.remove('dragover');
}
function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}
function handleFiles(files) {
    if (isImage(files[0].name)) {
        document.getElementsByTagName('input')[0].files = files;
        document.getElementById('m').style.opacity="100%";
        document.getElementById("dv").style.opacity="0%";
    }
}
function isImage(filename){
    if (filename.indexOf(".jpeg") != -1 || filename.indexOf(".png") != -1 || filename.indexOf(".jpg") != -1) {
        return true;
    } else {
        return false;
    }
}
document.getElementsByTagName("input")[0].oninput = function (e) {
    if (isImage(document.getElementsByTagName("input")[0].value)) {
        document.getElementById('m').style.opacity="100%";
        document.getElementById("dv").style.opacity="0%";
    }
}
function submit() {
    document.getElementsByTagName('form')[0].submit();
}
document.getElementsByTagName('button')[0].onclick=submit;