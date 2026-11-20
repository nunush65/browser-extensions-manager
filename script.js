fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
        let extensions = data;
        let currentFilter = 'all';
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const logo = document.querySelector('header img');

        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');

            themeIcon.src = isLight
                ? './assets/images/icon-moon.svg'
                : './assets/images/icon-sun.svg';
              logo.src = document.body.classList.contains('light-theme')
                    ? './assets/images/logo-light.svg'
                    : './assets/images/logo-dark.svg';
                
        });

        const display = document.getElementById('display');

        function renderExtensions() {
            let filteredExtensions = extensions;

            if (currentFilter === 'active') {
                filteredExtensions = extensions.filter((extension) => extension.isActive);
            } else if (currentFilter === 'inactive') {
                filteredExtensions = extensions.filter((extension) => !extension.isActive);
            }

            const cards = filteredExtensions.map((extension) => {
                const originalIndex = extensions.indexOf(extension);

                return `
                
                     <div class="flex min-h-52 flex-col justify-between rounded-2xl border border-[#41485a] bg-[#1f2535] p-4">
                        <div class="flex items-start gap-4">
                           <img src="${extension.logo}" alt="${extension.name} logo" class="h-12 w-12">

                             <div>
                         <h2 class="mb-2 text-lg font-bold">${extension.name}</h2>
                         <p class="text-sm leading-5 text-[#c5c9d6]">${extension.description}</p>
                         </div>
                        </div>

                     <div class="mt-6 flex items-center justify-between">
                         <button class="remove-btn rounded-full border border-[#6b7280] px-4 py-2 text-sm font-medium transition hover:bg-[#eb3434] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f15b4a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#091540]"
                             data-index="${originalIndex}">
                                    Remove
                               </button>

                           <button class="toggle-btn h-6 w-11 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f15b4a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#091540]     ${extension.isActive ? 'bg-[#f15b4a]' : 'bg-[#525a70]'}"
                           data-index="${originalIndex}">
                        <span class="block h-5 w-5 rounded-full bg-white transition-transform ${extension.isActive ? 'translate-x-5' : 'translate-x-0.5'}"></span>
                    </button>
                   </div>

                 </div>
                 `;
            });

            display.innerHTML = cards.join('');

          
            const toggleButtons = document.querySelectorAll('.toggle-btn');

            toggleButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    const index = Number(button.dataset.index);

                    extensions[index].isActive = !extensions[index].isActive;

                    renderExtensions();
                });
            });

         
            const removeButtons = document.querySelectorAll('.remove-btn');

            removeButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    const index = Number(button.dataset.index);

                    extensions.splice(index, 1);

                    renderExtensions();
                });
            });
        }

      
        const filterButtons = [
            document.getElementById('filter-all'),
            document.getElementById('filter-active'),
            document.getElementById('filter-inactive'),
        ];

        filterButtons.forEach((button) => {
       button.addEventListener('click', () => {
    currentFilter = button.id.replace('filter-', '');

    filterButtons.forEach((btn) => {
        btn.classList.remove('selected');
    });

    button.classList.add('selected');

    renderExtensions();
});
        });

        renderExtensions();
    });

