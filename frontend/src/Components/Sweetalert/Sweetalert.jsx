import Swal from 'sweetalert2';

const Sweetalert = (title, description, icon) => {
  Swal.fire({
    title: title,
    text: description,
    icon: icon,
  });
};

export default Sweetalert;
