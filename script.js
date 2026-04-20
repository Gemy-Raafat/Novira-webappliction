 AOS.init({ duration: 800, once: true });
      let currentUser = localStorage.getItem("novira_user")
        ? JSON.parse(localStorage.getItem("novira_user"))
        : null;
      const mainContent = document.getElementById("mainSiteContent");

      function showMainContent() {
        mainContent.style.display = "block";
      }
      function hideMainContent() {
        mainContent.style.display = "none";
      }
      function updateUIBasedOnAuth() {
        if (currentUser) {
          showMainContent();
          document.getElementById("auth-nav-buttons").innerHTML =
            `<div class="flex items-center gap-3"><span class="text-cyan-400 text-sm">👋 ${currentUser.name}</span><button onclick="logout()" class="text-sm bg-gray-800 px-3 py-1 rounded hover:bg-red-600/30">Logout</button></div>`;
          document.getElementById("mobile-auth-links").innerHTML =
            `<div class="flex justify-between"><span class="text-cyan-400">Hello, ${currentUser.name}</span><button onclick="logout()" class="bg-gray-800 px-3 py-1 rounded text-sm">Logout</button></div>`;
          document.getElementById("mobile-auth-icon").innerHTML =
            `<i class="fas fa-user-check text-cyan-400"></i>`;
        } else {
          hideMainContent();
        }
      }
      function openLoginModal() {
        document.getElementById("loginModal").style.display = "flex";
        document.getElementById("registerModal").style.display = "none";
      }
      function closeLoginModal() {
        document.getElementById("loginModal").style.display = "none";
      }
      function openRegisterModal() {
        document.getElementById("registerModal").style.display = "flex";
        document.getElementById("loginModal").style.display = "none";
      }
      function closeRegisterModal() {
        document.getElementById("registerModal").style.display = "none";
      }
      function switchToRegister() {
        closeLoginModal();
        openRegisterModal();
      }
      function switchToLogin() {
        closeRegisterModal();
        openLoginModal();
      }
      document
        .getElementById("registerFormElement")
        ?.addEventListener("submit", (e) => {
          e.preventDefault();
          const name = document.getElementById("regName").value.trim(),
            email = document.getElementById("regEmail").value.trim(),
            pwd = document.getElementById("regPassword").value,
            confirm = document.getElementById("regConfirmPassword").value,
            err = document.getElementById("registerError");
          if (!name || !email || !pwd) {
            err.innerText = "All fields required";
            err.classList.remove("hidden");
            return;
          }
          if (pwd !== confirm) {
            err.innerText = "Passwords do not match";
            err.classList.remove("hidden");
            return;
          }
          if (pwd.length < 4) {
            err.innerText = "Password min 4 characters";
            err.classList.remove("hidden");
            return;
          }
          const user = { name: name, email: email };
          localStorage.setItem("novira_user", JSON.stringify(user));
          currentUser = user;
          updateUIBasedOnAuth();
          closeRegisterModal();
          alert(`Welcome ${name}!`);
        });
      document
        .getElementById("loginFormElement")
        ?.addEventListener("submit", (e) => {
          e.preventDefault();
          const email = document.getElementById("loginEmail").value.trim(),
            pwd = document.getElementById("loginPassword").value,
            errorDiv = document.getElementById("loginError");
          const storedUser = localStorage.getItem("novira_user");
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.email === email && pwd.length >= 4) {
              currentUser = userData;
              updateUIBasedOnAuth();
              closeLoginModal();
              alert(`Welcome back ${userData.name}!`);
              return;
            }
          }
          if (email && pwd.length >= 4) {
            const tempUser = { name: email.split("@")[0], email: email };
            localStorage.setItem("novira_user", JSON.stringify(tempUser));
            currentUser = tempUser;
            updateUIBasedOnAuth();
            closeLoginModal();
            alert(`Logged in as ${tempUser.name} (demo)`);
          } else {
            errorDiv.innerText = "Invalid credentials. Register first.";
            errorDiv.classList.remove("hidden");
          }
        });
      function logout() {
        localStorage.removeItem("novira_user");
        currentUser = null;
        updateUIBasedOnAuth();
        alert("Logged out.");
        openLoginModal();
      }
      document
        .getElementById("contactForm")
        ?.addEventListener("submit", (e) => {
          e.preventDefault();
          const status = document.getElementById("formStatus");
          status.innerText = "✓ Message sent! Noveyra will contact you soon.";
          status.classList.remove("hidden");
          e.target.reset();
          setTimeout(() => status.classList.add("hidden"), 4000);
        });
      document
        .getElementById("mobile-menu-btn")
        ?.addEventListener("click", () => {
          document.getElementById("mobile-menu").classList.toggle("hidden");
        });
      document.querySelectorAll('a[href^="#"]').forEach((anchor) =>
        anchor.addEventListener("click", function (e) {
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
            document.getElementById("mobile-menu")?.classList.add("hidden");
          }
        }),
      );
      window.scrollToTop = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

      // Light/Dark Mode Toggle with improved readability
      function initTheme() {
        const saved = localStorage.getItem("novira_theme");
        if (saved === "light") document.body.classList.add("light-mode");
        else document.body.classList.remove("light-mode");
      }
      function toggleTheme() {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        localStorage.setItem("novira_theme", isLight ? "light" : "dark");
        updateThemeIcons();
      }
      function updateThemeIcons() {
        const isLight = document.body.classList.contains("light-mode");
        const icons = document.querySelectorAll(
          "#themeToggleDesktop i, #themeToggleMobile i",
        );
        icons.forEach((icon) => {
          if (isLight) icon.className = "fas fa-sun";
          else icon.className = "fas fa-moon";
        });
      }
      document
        .getElementById("themeToggleDesktop")
        ?.addEventListener("click", toggleTheme);
      document
        .getElementById("themeToggleMobile")
        ?.addEventListener("click", toggleTheme);
      initTheme();
      updateThemeIcons();
      if (!currentUser) {
        openLoginModal();
      } else {
        showMainContent();
      }
      updateUIBasedOnAuth();
      window.onclick = function (e) {
        if (e.target === document.getElementById("loginModal"))
          closeLoginModal();
        if (e.target === document.getElementById("registerModal"))
          closeRegisterModal();
      };