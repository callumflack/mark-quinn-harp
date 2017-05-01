(function() {
    const touchnav = document.querySelector('[data-modal]');
    const ACTIVE_CLASS = 'is-active';

    document.querySelector('[data-modal-toggle]').addEventListener('click', (e) => {
        e.stopPropagation();

        touchnav.classList.add(ACTIVE_CLASS);
        touchnav.addEventListener('click', (e) => {
            touchnav.classList.remove(ACTIVE_CLASS);
        });
    });
})();
