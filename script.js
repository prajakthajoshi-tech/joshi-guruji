/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const mainNav =
    document.getElementById("mainNav");


menuButton.addEventListener("click", function () {

    mainNav.classList.toggle("show");

});


document.querySelectorAll("#mainNav a")
    .forEach(function (link) {

        link.addEventListener("click", function () {

            mainNav.classList.remove("show");

        });

    });



/* =====================================================
   POOJA SELECTION
===================================================== */

function choosePooja(poojaName) {

    const pooja =
        document.getElementById("pooja");

    pooja.value = poojaName;


    const otherBox =
        document.getElementById("otherPoojaBox");


    if (poojaName === "Other") {

        otherBox.classList.remove("hidden");

        document
            .getElementById("otherPooja")
            .focus();

    } else {

        otherBox.classList.add("hidden");

    }


    document
        .getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* =====================================================
   OTHER POOJA
===================================================== */

document
    .getElementById("pooja")
    .addEventListener("change", function () {

        const otherBox =
            document.getElementById("otherPoojaBox");

        const otherInput =
            document.getElementById("otherPooja");


        if (this.value === "Other") {

            otherBox.classList.remove("hidden");

            otherInput.required = true;

        } else {

            otherBox.classList.add("hidden");

            otherInput.required = false;

            otherInput.value = "";

        }

    });



/* =====================================================
   DATE
===================================================== */

const dateInput =
    document.getElementById("date");

const today =
    new Date()
        .toISOString()
        .split("T")[0];

dateInput.min = today;



/* =====================================================
   BOOKING FORM
===================================================== */

document
    .getElementById("bookingForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const phone =
            document
                .getElementById("phone")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const pooja =
            document
                .getElementById("pooja")
                .value;


        const date =
            document
                .getElementById("date")
                .value;


        const mode =
            document
                .getElementById("mode")
                .value;


        const address =
            document
                .getElementById("address")
                .value
                .trim();


        const message =
            document
                .getElementById("message")
                .value
                .trim();


        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        let finalPooja = pooja;


        if (pooja === "Other") {

            finalPooja =
                document
                    .getElementById("otherPooja")
                    .value
                    .trim();


            if (!finalPooja) {

                alert(
                    "Please enter the pooja you require."
                );

                return;

            }

        }



        /* =================================================
           SAVE BOOKING LOCALLY
        ================================================= */

        const booking = {

            name: name,

            phone: phone,

            email: email,

            pooja: finalPooja,

            date: date,

            mode: mode,

            address: address,

            message: message,

            payment: payment,

            submittedAt:
                new Date().toLocaleString()

        };


        let bookings =
            JSON.parse(
                localStorage.getItem(
                    "joshiGurujiBookings"
                )
            ) || [];


        bookings.push(booking);


        localStorage.setItem(
            "joshiGurujiBookings",
            JSON.stringify(bookings)
        );



        /* =================================================
           WHATSAPP MESSAGE
        ================================================= */

        const whatsappMessage =

`🕉️ JOSHI GURUJI
POOJA BOOKING ENQUIRY

Name: ${name}

Phone: ${phone}

Email: ${email}

Pooja: ${finalPooja}

Date: ${date}

Service: ${mode}

Payment Mode: ${payment}

Address:
${address || "Not provided"}

Additional Requirements:
${message || "None"}`;


        const whatsappURL =
            "https://wa.me/919866983647?text=" +
            encodeURIComponent(
                whatsappMessage
            );



        /* =================================================
           SUCCESS
        ================================================= */

        const result =
            document.getElementById(
                "bookingResult"
            );


        result.style.display = "block";


        result.innerHTML = `

            <strong>
                ✓ Booking enquiry submitted!
            </strong>

            <br><br>

            Your enquiry has been saved.

            <br>

            For faster confirmation,
            send the details directly to
            Panduranga Joshi on WhatsApp.

            <br><br>

            <a
                href="${whatsappURL}"
                target="_blank"
                style="
                    display:inline-block;
                    padding:10px 20px;
                    background:#25d366;
                    color:#fff;
                    border-radius:25px;
                    text-decoration:none;
                    font-weight:bold;
                "
            >
                💬 Send Booking on WhatsApp
            </a>

        `;


        this.reset();


        document
            .getElementById("otherPoojaBox")
            .classList.add("hidden");


        window.scrollTo({

            top:
                result.getBoundingClientRect().top
                + window.scrollY
                - 120,

            behavior: "smooth"

        });

    });



/* =====================================================
   REVIEW FORM
===================================================== */

function toggleReviewForm() {

    const box =
        document.getElementById("reviewBox");


    if (box.style.display === "block") {

        box.style.display = "none";

    } else {

        box.style.display = "block";

        box.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}



/* =====================================================
   REVIEW SUBMISSION
===================================================== */

document
    .getElementById("reviewForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("reviewName")
                .value
                .trim();


        const rating =
            document
                .getElementById("reviewRating")
                .value;


        const text =
            document
                .getElementById("reviewText")
                .value
                .trim();


        const review = {

            name: name,

            rating: rating,

            text: text

        };


        let reviews =
            JSON.parse(
                localStorage.getItem(
                    "joshiGurujiReviews"
                )
            ) || [];


        reviews.push(review);


        localStorage.setItem(
            "joshiGurujiReviews",
            JSON.stringify(reviews)
        );


        alert(
            "Thank you for your review!"
        );


        this.reset();

    });