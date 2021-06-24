/* ScrollTop Button */
$(document).ready(function () {
            /* ScrollTop Button */
            
            function() {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    $(#scrollTop).style.display = "block";
                } else {
                    $(#scrollTop).style.display = "none";
                }

            }