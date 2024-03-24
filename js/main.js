(function ($) {
  "use strict";

  // loader
  var loader = function () {
    setTimeout(function () {
      if ($("#loader").length > 0) {
        $("#loader").removeClass("show");
      }
    }, 1);
  };
  loader();

  // Initiate the wowjs
  new WOW().init();

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $(".navbar").addClass("nav-sticky");
    } else {
      $(".navbar").removeClass("nav-sticky");
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        1500,
        "easeInOutExpo"
      );

      if ($(this).parents(".navbar-nav").length) {
        $(".navbar-nav .active").removeClass("active");
        $(this).closest("a").addClass("active");
      }
    }
  });

  // Typed Initiate
  if ($(".hero .hero-text h2").length == 1) {
    var typed_strings = $(".hero .hero-text .typed-text").text();
    var typed = new Typed(".hero .hero-text h2", {
      strings: typed_strings.split(", "),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // Skills
  $(".skills").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Testimonials carousel
  $(".testimonials-carousel").owlCarousel({
    center: true,
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  });

  // Portfolio filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });

  $("#portfolio-filter li").on("click", function () {
    $("#portfolio-filter li").removeClass("filter-active");
    $(this).addClass("filter-active");
    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });
})(jQuery);

//form validations

const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const subjectElement = document.getElementById("subject");
const messageElement = document.getElementById("message");

//email validation
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function setError(element, massage) {
  element.style.border = "1px solid red";
  const errorElement = element.nextElementSibling;
  errorElement.innerText = massage;
}

function setSuccess(element) {
  element.style.border = "1px solid green";
  const errorElement = element.nextElementSibling;
  errorElement.innerText = "";
}

function handleForm(event) {
  event.preventDefault();
  const name = nameElement.value;
  const email = emailElement.value;
  const message = messageElement.value;

  if (name === "" || name.length < 3) {
    return setError(nameElement, "name is required");
  } else {
    setSuccess(nameElement);
  }
  if (validateEmail(email)) {
    setSuccess(nameElement);
  } else {
    return setError(emailElement, "email is required");
  }
  if (message === "") {
    return setError(messageElement, "message is required");
  } else {
    setSuccess(messageElement);
  }
  //email Js
  var templateParams = {
    name: "name",
    email: "email",
    message: "message",
  };

  emailjs.send("service_igvdke7", "template_ops7fsw", templateParams).then(
    (response) => {
      //   console.log("send", response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your mail send successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    (error) => {
      //   console.log("FAILED...", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  );
}
