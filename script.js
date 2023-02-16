// navbar
const hamburger = document.querySelector(".nav-hamburger");
const hamburgerIcon = hamburger.querySelector("i");
const mobileMenu = document.querySelector(".menu-bar");

const menu = document.querySelector(".menu-links");

function toggleMenu() {
	hamburgerIcon.className =
		hamburgerIcon.className === "fa-solid fa-bars"
			? "fa-solid fa-xmark"
			: "fa-solid fa-bars";

	mobileMenu.classList.toggle("is-open");
}

hamburger.addEventListener("click", toggleMenu);
menu.addEventListener("click", toggleMenu);

// colors
const dark = " rgb(40, 40, 40)";
const light = " rgb(250, 250, 250)";
const primary = " rgb(255, 220, 100)";
const secondary = " rgb(255, 105, 80)";
const darkdark = " rgb(25, 25, 25)";

// dark mode
const root = document.querySelector(":root");
const rootStyle = window.getComputedStyle(root);
const toggle = document.querySelectorAll(".dm-toggle");

function toggleDm() {
	toggle.forEach((el) => {
		const toggleIcon = el.querySelector("i").querySelector("i");

		toggleIcon.className =
			toggleIcon.className === "fa-solid fa-sun"
				? "fa-solid fa-moon"
				: "fa-solid fa-sun";

		el.classList.toggle("dm");
	});
}

toggle.forEach((el) => {
	el.addEventListener("click", () => {
		toggleDm();

		if (
			rootStyle.getPropertyValue("--dark") === dark ||
			rootStyle.getPropertyValue("--dark") === "rgb(40, 40, 40)"
		) {
			root.style.setProperty("--dark", light);
			root.style.setProperty("--light", dark);
			root.style.setProperty("--primary", secondary);
			root.style.setProperty("--secondary", primary);
		} else if (rootStyle.getPropertyValue("--dark") === light) {
			root.style.setProperty("--dark", dark);
			root.style.setProperty("--light", light);
			root.style.setProperty("--primary", primary);
			root.style.setProperty("--secondary", secondary);
		}
	});
});

// contact form
const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const success = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error");

function validateForm() {
	clearMessages();
	let errorFlag = false;

	if (nameInput.value.length < 1) {
		errorNodes[0].innerText = "Name cannot be blank";
		nameInput.classList.add("error-border");
		errorFlag = true;
	}

	if (!emailIsValid(email.value)) {
		errorNodes[1].innerText = "Invalid email address";
		email.classList.add("error-border");
		errorFlag = true;
	}

	if (message.value.length < 1) {
		errorNodes[2].innerText = "Please enter message";
		message.classList.add("error-border");
		errorFlag = true;
	}

	if (!errorFlag) {
		sendMail(nameInput.value, email.value, message.value);

		success.innerText = "Message Sent";
	}
}

function sendMail(name, email, msg) {
	emailjs.send("service_3dux6ue", "template_wym3meq", {
		from_name: email,
		to_name: name,
		message: msg,
	});
}

function clearMessages() {
	for (let i = 0; i < errorNodes.length; i++) {
		errorNodes[i].innerText = "";
	}

	success.innerText = "";
	nameInput.classList.remove("error-border");
	email.classList.remove("error-border");
	message.classList.remove("error-border");
}

function emailIsValid(email) {
	let pattern = /\S+@\S+\.\S+/;
	return pattern.test(email);
}
