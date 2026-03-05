/*1) Custom Rotary Carousel Navigator*/
const carousel = document.getElementById("heroCarousel");
const marker = document.getElementById("dialMarker");

if (carousel && marker) {
  carousel.addEventListener("slide.bs.carousel", function (event) {
    if (event.direction === "right") {
      marker.style.transform = "translateX(-50%) rotate(-35deg)";
    } else {
      marker.style.transform = "translateX(-50%) rotate(35deg)";
    }

    setTimeout(() => {
      marker.style.transform = "translateX(-50%) rotate(0deg)";
    }, 400);
  });
}

/*2) Gallery Auto Loop Mechanism*/
const filmStrip = document.querySelector(".film-strip");

if (filmStrip) {
  const stripContent = filmStrip.innerHTML;
  filmStrip.innerHTML += stripContent;
}

/*3) Project Pop Up Mechanism*/
function openProject(name, img, badge, desc) {
  document.getElementById("modalName").innerText = name;
  document.getElementById("modalImg").src = img;
  document.getElementById("modalBadge").innerText = badge;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalTitle").innerText =
    name.toUpperCase().replace(/\s/g, "_") + ".RAW";
}

/*4) Contact Message Mechanism*/
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = e.target.querySelector("button");
    btn.innerText = "DEVELOPING...";
    setTimeout(() => {
      btn.innerText = "MESSAGE SENT (EXPOSED)";
      btn.style.backgroundColor = "#28a745";
    }, 1500);
  });
}

// 1. Project Database
const projects = [
  {
    title: "Framing Laptop",
    img: "assets/image/project-desc-1.jpg",
    category: "Dasar Pemrograman",
    desc: "This project focuses on the process of dissecting a laptop piece by piece, but also understanding the usage of each parts and their role in the computer.",
  },
  {
    title: "Reels Pengantar Teknologi",
    img: "assets/image/project-desc-2.jpg",
    category: "Pengantar Teknologi",
    desc: "This project consists of multiple topics we learn in Pengantar Teknologi and turning them into educational reels, this is also a testament of our understanding on the topics that have been given to us.",
  },
  {
    title: "Reels Deforestasi",
    img: "assets/image/project-desc-3.jpg",
    category: "Kepemimpinan yang Melayani",
    desc: "This project takes a more personal path, specifically more towards personal growth where we learn how to be a great servant leaders in a world full of new challenges.",
  },
];

// 2. Inject Projects into HTML
const projectGrid = document.getElementById("project-grid");

if (projectGrid) {
  projects.forEach((proj, index) => {
    projectGrid.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="project-card" 
             data-bs-toggle="modal" 
             data-bs-target="#projectModal" 
             onclick="loadProjectData(${index})">
          <img src="${proj.img}" alt="${proj.title}" />
          <div class="project-overlay">
            <span class="badge rounded-pill bg-danger mb-2">${proj.category}</span>
            <h3>${proj.title}</h3>
            <p>Click to view details.</p>
          </div>
        </div>
      </div>
    `;
  });
}

// 3. Function to Load Data into Modal
function loadProjectData(index) {
  const p = projects[index];
  document.getElementById("modalName").innerText = p.title;
  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalBadge").innerText = p.category;
  document.getElementById("modalDesc").innerText = p.desc;
  document.getElementById("modalTitle").innerText =
    p.title.toUpperCase().replace(/\s/g, "_") + ".RAW";
}

const universe = document.getElementById("lensUniverse");
const nodes = document.querySelectorAll(".bokeh-node");
const flare = document.getElementById("lensFlare");
const dLabel = document.querySelector("#lens-content .label");
const dTitle = document.querySelector("#lens-content .title");
const dMeta = document.querySelector("#lens-content .meta");
const brackets = document.querySelector(".focus-brackets");

if (universe) {
  nodes.forEach((node) => {
    node.addEventListener("mouseenter", () => {
      dLabel.innerText = node.getAttribute("data-school");
      dTitle.innerText = node.getAttribute("data-name");
      dMeta.innerText = `LENS_EXP_${node.getAttribute("data-year")}.RAW`;

      brackets.style.width = "115%";
      brackets.style.borderColor = "#00CAB1";

      if (flare) {
        flare.classList.remove("flare-sweep");
        void flare.offsetWidth;
        flare.classList.add("flare-sweep");
      }
    });

    node.addEventListener("mouseleave", () => {
      brackets.style.width = "100%";
      brackets.style.borderColor = "rgba(0, 202, 177, 0.2)";
    });
  });

  // 4. Parallax Depth (Follow Mouse)
  universe.addEventListener("mousemove", (e) => {
    const rect = universe.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    nodes.forEach((node) => {
      const depth = node.getAttribute("data-depth");
      node.style.transform = `translate(${x * (depth * 80)}px, ${y * (depth * 80)}px)`;
    });
  });
}
