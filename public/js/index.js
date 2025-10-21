// Function to open a specific modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex"; // Use flex to center
    document.body.style.overflow = "hidden"; // Prevent scrolling background
  }
}

// Function to close a specific modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  }
}

// Close modal if user clicks outside of it
window.onclick = function (event) {
  // Only close if the clicked element has the 'modal' class AND is the modal itself (not its content)
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    document.body.style.overflow = "auto";
  }
};

async function fetchProjects() {
  const projectsContainer = document.getElementById("projects-container");
  const modalsContainer = document.getElementById("modals-container"); // This div will hold all modals

  if (!projectsContainer || !modalsContainer) {
    console.error(
      "Required DOM elements (projects-container or modals-container) not found."
    );
    return;
  }

  try {
    const response = await fetch("/projects");
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();

    projectsContainer.innerHTML = ""; // Clear existing content
    modalsContainer.innerHTML = ""; // Clear existing modals

    projects.forEach((project) => {
      // Create Project Card
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      // Attach event listener directly using the openModal helper
      projectCard.onclick = () => openModal(project.modalId); // Use arrow function to capture project.modalId

      projectCard.innerHTML = `
                <img src="${project.imageCard}" alt="${project.altCard}" />
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.shortDescription}</p>
                    <div class="project-button">
                      <button onclick="event.stopPropagation(); openModal('${project.modalId}')">
                          Learn More
                      </button>
                      <a href="${project.url}" target="_blank">
                        <button class="link">
                            Visit Page
                        </button>
                      </a>
                    </div>
                </div>
            `;
      projectsContainer.appendChild(projectCard);

      // Create Project Modal
      const projectModal = document.createElement("div");
      projectModal.id = project.modalId; // Set the ID from JSON
      projectModal.classList.add("modal");

      const technologiesHtml = project.technologies
        .map((tech) => tech)
        .join(", ");

      projectModal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button" onclick="closeModal('${project.modalId}')">&times;</span>
                    <h3 class="dark-font">${project.title} Details</h3>
                    <img src="${project.imageModal}" alt="${project.altModal}" style="width: 100%; margin-bottom: 20px" />
                    <p class="dark-font">${project.fullDescription}</p>
                    <p class="dark-font">
                        <strong>Technologies Used:</strong> ${technologiesHtml}
                    </p>
                </div>
            `;
      modalsContainer.appendChild(projectModal);
    });
  } catch (error) {
    console.error("Error fetching or rendering projects:", error);
    projectsContainer.innerHTML =
      '<p style="color: red; text-align: center;">Failed to load projects. Please try again later.</p>';
  }
}

async function fetchServices() {
  const url = "/services";
  const servicesContainer = document.getElementById("services-container");

  if (servicesContainer) {
    servicesContainer.innerHTML = "";
  } else {
    console.error("Element with ID 'services-container' not found.");
    return; // Exit if the container isn't found
  }

  try {
    const response = await fetch(url);

    // Check for HTTP errors
    if (!response.ok) {
      // Use response.ok for clearer error checking (status in 200-299 range)
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const services = await response.json();

    console.log("Fetched services:", services);

    // Create the new table element
    const tableElement = document.createElement("table");
    tableElement.classList.add("services-table"); // Add a class for styling

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const categoryHeader = document.createElement("th");
    categoryHeader.textContent = "Category";
    headerRow.appendChild(categoryHeader);

    const servicesHeader = document.createElement("th");
    servicesHeader.textContent = "Services";
    headerRow.appendChild(servicesHeader);

    thead.appendChild(headerRow);
    tableElement.appendChild(thead); // Append thead to the tableElement

    // Create table body
    const tableBody = document.createElement("tbody");

    // Populate table body with services or a "no services" message
    if (services && Array.isArray(services) && services.length > 0) {
      services.forEach((service) => {
        const row = document.createElement("tr");

        const categoryCell = document.createElement("td");
        categoryCell.textContent = service.category || "N/A"; 
        row.appendChild(categoryCell);

        const servicesCell = document.createElement("td");
        servicesCell.textContent = service.services || "N/A";
        row.appendChild(servicesCell);

        tableBody.appendChild(row); 
      });
    } else {
      // Handle case where no services are returned or services is empty/not an array
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 2; 
      cell.textContent = "No service available to display.";
      row.appendChild(cell);
      tableBody.appendChild(row); 
    }

    tableElement.appendChild(tableBody); 

    servicesContainer.appendChild(tableElement);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    // Display an error message directly in the container
    if (servicesContainer) {
      servicesContainer.innerHTML =
        '<p style="color: red; text-align: center;">Error loading services. Please try again later.</p>';
    }
  }
}

document.addEventListener("DOMContentLoaded", fetchServices, fetchProjects);



// Existing Navigation Toggle (assuming this is in the same script)
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const mainNav = document.getElementById("main-nav");

  if (hamburgerMenu && mainNav) {
    hamburgerMenu.addEventListener("click", () => {
      mainNav.classList.toggle("open");
      hamburgerMenu.classList.toggle("open");
    });

    // Close the menu when a nav link is clicked (useful for single-page sites)
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (mainNav.classList.contains("open")) {
          mainNav.classList.remove("open");
          hamburgerMenu.classList.remove("open");
        }
      });
    });
  }
});




window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('glass-header');
  } else {
    header.classList.remove('glass-header');
  }
});
