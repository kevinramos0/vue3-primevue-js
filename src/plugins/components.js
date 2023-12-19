import { upperFirst, camelCase } from 'lodash';

const regComponents = (vm) => {
    const requireComponent = import.meta.globEager('@/**/**/*.vue');
    for (const file in requireComponent) {
        if (Object.prototype.hasOwnProperty.call(requireComponent, file)) {
            const componentConf = requireComponent[file];
            const fileName = file.match(/[^/]+\.vue$/)[0]; // Obtener el nombre del archivo con extensión
            let componentName = upperFirst(camelCase(fileName.replace(/\.\w+$/, '')));

            vm.component(componentName, componentConf.default || componentConf);
        }
    }
};
export default regComponents;
