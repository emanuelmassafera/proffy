document.querySelector("#add-time").addEventListener("click", cloneField);

function cloneField() {
    const containers = document.querySelectorAll(".schedule-item");
    const lastContainer = containers[containers.length - 1];
    let cont = 0;

    const lastContainerInputs = lastContainer.querySelectorAll("input");
    const lastContainerSelect = lastContainer.querySelector("select");

    lastContainerInputs.forEach(field => {
        if (field.value == "") {
            cont += 1;
        }
    });

    if (lastContainerSelect.value == "") {
        cont += 1;
    }

    if (cont == 0) {
        if (containers.length - 1 == 0) {
            lastContainer.querySelector(".alert-and-close").classList.remove("active");
        }
        
        lastContainer.querySelector(".alert").classList.remove("active");           

        const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true);

        const fields = newFieldContainer.querySelectorAll("input");

        fields.forEach(field => {
            field.value = "";
        });

        newFieldContainer.querySelector(".alert-and-close").classList.add("active");
        newFieldContainer.querySelector(".close").classList.add("active");
        newFieldContainer.querySelector(".close").addEventListener("click", function() {
            const parentNode = newFieldContainer.querySelector(".close").parentNode;
            const parentField = parentNode.parentNode;
            const parentContainer = parentField.parentNode;

            parentContainer.removeChild(parentField);
        });

        document.querySelector("#schedule-items").appendChild(newFieldContainer);

    } else {
        lastContainer.querySelector(".alert-and-close").classList.add("active");
        lastContainer.querySelector(".alert").classList.add("active");
    }
}
