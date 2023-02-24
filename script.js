// navbar
class Navbar {
	constructor() {
		this.hamburger = document.querySelector(".nav-hamburger");
		this.hamburgerIcon = this.hamburger.querySelector("i");
		this.mobileMenu = document.querySelector(".m-navbar");
		this.menu = document.querySelector(".m-nav-links");

		this.hamburger.addEventListener("click", this.toggleMenu.bind(this));
		this.menu.addEventListener("click", this.toggleMenu.bind(this));
	}

	toggleMenu() {
		this.hamburgerIcon.className =
			this.hamburgerIcon.className === "fa-solid fa-bars"
				? "fa-solid fa-xmark"
				: "fa-solid fa-bars";

		this.mobileMenu.classList.toggle("is-open");
	}
}

const navbar = new Navbar();

// colors
class Colors {
	constructor() {
		this.dark = " rgb(40, 40, 40)";
		this.light = " rgb(250, 250, 250)";
		this.primary = " rgb(255, 220, 100)";
		this.secondary = " rgb(255, 105, 80)";
		this.darkdark = " rgb(25, 25, 25)";
	}
}

// dark mode
class DarkMode {
	constructor() {
		this.root = document.querySelector(":root");
		this.rootStyle = window.getComputedStyle(this.root);
		this.toggle = document.querySelectorAll(".dm-toggle");

		this.colors = new Colors();

		this.toggle.forEach((el) => {
			el.addEventListener("click", () => {
				this.toggleDm();

				if (
					this.rootStyle.getPropertyValue("--dark") === this.colors.dark ||
					this.rootStyle.getPropertyValue("--dark") === "rgb(40, 40, 40)"
				) {
					this.setColors(
						this.colors.light,
						this.colors.dark,
						this.colors.secondary,
						this.colors.primary
					);
				} else if (
					this.rootStyle.getPropertyValue("--dark") === this.colors.light
				) {
					this.setColors(
						this.colors.dark,
						this.colors.light,
						this.colors.primary,
						this.colors.secondary
					);
				}
			});
		});
	}

	toggleDm() {
		this.toggle.forEach((el) => {
			const toggleIcon = el.querySelector("i").querySelector("i");

			toggleIcon.className =
				toggleIcon.className === "fa-solid fa-sun"
					? "fa-solid fa-moon"
					: "fa-solid fa-sun";

			el.classList.toggle("dm");
		});
	}

	setColors(dark, light, primary, secondary) {
		this.root.style.setProperty("--dark", dark);
		this.root.style.setProperty("--light", light);
		this.root.style.setProperty("--primary", primary);
		this.root.style.setProperty("--secondary", secondary);
	}
}

const darkMode = new DarkMode();

// contact form
class ContactForm {
	constructor(nameInput, emailInput, messageInput, successMessage, errorNodes) {
		this.nameInput = nameInput;
		this.emailInput = emailInput;
		this.messageInput = messageInput;
		this.successMessage = successMessage;
		this.errorNodes = errorNodes;
	}

	validateForm() {
		this.clearMessages();
		let errorFlag = false;

		if (this.nameInput.value.length < 1) {
			this.errorNodes[0].innerText = "Name cannot be blank";
			this.nameInput.classList.add("error-border");
			errorFlag = true;
		}

		if (!this.emailIsValid(this.emailInput.value)) {
			this.errorNodes[1].innerText = "Invalid email address";
			this.emailInput.classList.add("error-border");
			errorFlag = true;
		}

		if (this.messageInput.value.length < 1) {
			this.errorNodes[2].innerText = "Please enter message";
			this.messageInput.classList.add("error-border");
			errorFlag = true;
		}

		if (!errorFlag) {
			this.sendMail(
				this.nameInput.value,
				this.emailInput.value,
				this.messageInput.value
			);

			this.successMessage.innerText = "Message Sent";
		}
	}

	sendMail(name, email, msg) {
		emailjs.send("service_3dux6ue", "template_wym3meq", {
			from_name: email,
			to_name: name,
			message: msg,
		});
	}

	clearMessages() {
		this.errorNodes.forEach((el) => {
			el.innerText = "";
		});

		this.successMessage.innerText = "";
		this.nameInput.classList.remove("error-border");
		this.emailInput.classList.remove("error-border");
		this.messageInput.classList.remove("error-border");
	}

	emailIsValid(email) {
		let pattern = /\S+@\S+\.\S+/;
		return pattern.test(email);
	}
}

// Usage example:
const form = new ContactForm(
	document.querySelector("#name"),
	document.querySelector("#email"),
	document.querySelector("#message"),
	document.querySelector("#success"),
	document.querySelectorAll(".error")
);

document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();
	form.validateForm();
});
