document.querySelectorAll("[data-list-id]").forEach((section) => {
	//toggle show new
	section.querySelector(".set-list-grid").addEventListener("click", (evt) => {
		evt.preventDefault();

		document.querySelectorAll(".show-all-wrapper").forEach((wrapper) => {
			// Check row count in element. If there's more than 3 rows, hide everything after every row after the third row.

			// Get all manga children
			let kids = [...wrapper.children].filter((el) => el.nodeName !== "BUTTON");

			for (let div of kids) {
				div.classList.toggle("hide-manga");
			}

			//if  section.querySelector(".set-list-grid").innerHTML = "show all" change to new and vice versa
			if (section.querySelector(".set-list-grid").innerHTML == "show all") {
				section.querySelector(".set-list-grid").innerHTML = "show new";
			} else {
				section.querySelector(".set-list-grid").innerHTML = "show all";
			}
		});
	});
});

function doCheck() {
	document.querySelectorAll(".show-all-wrapper").forEach((wrapper) => {
		// Check row count in element. If there's more than 3 rows, hide everything after every row after the third row.

		// Get all manga children
		let kids = [...wrapper.children].filter((el) => el.nodeName !== "BUTTON");

		// Clean up
		for (let div of kids) {
			div.classList.remove("do-hide");
		}

		// Get offsets with elements
		let offsets = kids.map((el) => ({
			el,
			top: el.getBoundingClientRect().top,
		}));

		let rowOffsets = [...new Set(offsets.map((v) => v.top))];

		// Get array of elements per row. Don't ask.
		let rows = [];
		for (let offsetWrapper of offsets) {
			if (!rows[rowOffsets.indexOf(offsetWrapper.top)])
				rows[rowOffsets.indexOf(offsetWrapper.top)] = [];
			rows[rowOffsets.indexOf(offsetWrapper.top)].push(offsetWrapper.el);
		}

		// Hide children after third row
		let toHide = rows.slice(8).flat();

		if (toHide.length > 0) {
			wrapper.classList.remove("do-show-all");
		} else {
			wrapper.classList.add("do-show-all");
		}

		for (let el of toHide) {
			el.classList.add("do-hide");
		}

		wrapper
			.querySelectorAll(".more-count")
			.forEach((el) => (el.innerText = toHide.length));
	});
}
window.addEventListener("load", () => {
	// Add event listener for "read more"
	document.querySelectorAll("button.show-all").forEach((btn) => {
		btn.addEventListener("click", () => {
			btn.closest(".show-all-wrapper").classList.add("force-show");
		});
	});

	// Run main row check
	doCheck();
});

let links = [];

document.querySelectorAll(".remove-div").forEach((el) => {
	el.addEventListener("click", () => {
		var link = el.getAttribute("data-path");

		//if links already contains link, remove it
		if (links.includes(link)) {
			links.splice(links.indexOf(link), 1);
			el.classList.toggle("remove-selected");
		}
		//else add link to links
		else {
			links.push(link);
			el.classList.toggle("remove-selected");
		}
		document.querySelector("#selected-txt").textContent =
			"sel. " + links.length;
		console.log(links);
	});
});

document.querySelector(".delete-butt").addEventListener("click", () => {
	if (
		confirm(
			"Really hide this series from read? It won't show up until you read more of this."
		)
	) {
		links.forEach(async function (url, array) {
			console.log(url);

			if (!url.endsWith("/")) url += "/";

			await fetch(`${url}hide-series/`, {
				method: "POST",
			});
		});
		links = [];
		location.reload();
		//let url = link;
		//if (!url.endsWith("/")) url += "/";

		//	fetch(`${url}hide-series/`, {
		//		method: "POST",
		//	});
	}
});

let resizeDebounce;
window.addEventListener("resize", () => {
	if (resizeDebounce) {
		clearTimeout(resizeDebounce);
		delete resizeDebounce;
	}
	resizeDebounce = setTimeout(doCheck, 1e3 / 60);
});

document.querySelectorAll(".list-type-option").forEach((el) => {
	el.addEventListener("click", () => {
		requestAnimationFrame(doCheck);
	});
});

document.querySelectorAll(".remove-announcement").forEach((button) => {
	button.addEventListener("click", () => {
		fetch("/dismiss-announcement", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				id: Number(button.closest("[data-id]").getAttribute("data-id")),
			}),
		})
			.then((d) => d.json())
			.then((d) => {
				if (d.status !== 200) {
					alert(d.error);
				} else {
					location.reload();
				}
			});
	});
});
