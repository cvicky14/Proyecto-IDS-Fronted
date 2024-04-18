var modal = document.getElementById("myModal");
        var btn = document.getElementById("openModal");
        var span = document.getElementsByClassName("close")[0];
        var form = document.querySelector('form');
    
        btn.onclick = function() {
            modal.style.display = "block";
        }
        span.onclick = function() {
            modal.style.display = "none";
            resetForm();
        }
    
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                resetForm();
            }
        }
    
        form.onsubmit = function() {
            modal.style.display = "none";
            resetForm();
            return false;
        }
    
        function resetForm() {
            document.querySelector('.textarea-wrapper textarea').value = '';
            var preview = document.querySelector('.textarea-image');
            while (preview.firstChild) {
                preview.removeChild(preview.firstChild);
            }
            document.getElementById('image-upload').value = '';
        }
    
        function previewImage(event) {
            var input = event.target;
            var preview = document.querySelector('.textarea-image');
            while (preview.firstChild) {
                preview.removeChild(preview.firstChild);
            }
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var img = document.createElement('img');
                    img.src = e.target.result;
                    preview.appendChild(img);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }