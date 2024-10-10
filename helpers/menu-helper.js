const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [
        {
          title: 'Dashboard-1',
          icon: 'mdi mdi-gauge',
          submenu: [
            { title: 'Main', url: '/' },
            { title: 'Progress Bar', url: 'progress'},
            { title: 'Graphics', url:'grafica1'},
            { title: 'Promises', url:'promises'},
            { title: 'Rxjs', url:'rxjs'},
          ],
        },
        {
          title: 'Mantenimientos',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // { title: 'Usuarios', url: 'users' },
            { title: 'Doctores', url: 'doctors'},
            { title: 'Hospitales', url:'hospitals'},
          ],
        },
      ];

    if( role === 'ADMIN_ROLE' ){
        menu[1].submenu.unshift({ title: 'Usuarios', url: 'users' });
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}