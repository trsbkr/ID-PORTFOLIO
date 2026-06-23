
/* ========================
   THE HOME LUANCH LOGIC OF
   THE ACTIVE STATE OF BOTH 
   THE DOT AND KNOB RESIDING 
   WITHIN THE MAIN SWITCH 
   ======================== */

document
.querySelectorAll(
    ".switch-btn[data-target]"
)
.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            btn.classList.add(
                "active"
            );

            setTimeout(() => {

                window.location.href =
                btn.dataset.target;

            }, 450);

        }
    );

});


/* ========================
   THE MENU LUANCH LOGIC OF
   THE ACTIVE STATE OF BOTH 
   THE DOT AND KNOB RESIDING 
   WITHIN THE MAIN SWITCH 
   ======================== */

const menuSwitch =
document.getElementById(
    "menu-switch"
);

const dropdown =
document.getElementById(
    "dropdown-menu"
);

menuSwitch.addEventListener(
    "click",
    () => {

        menuSwitch.classList.toggle(
            "active"
        );

        dropdown.classList.toggle(
            "active"
        );

    }
);



