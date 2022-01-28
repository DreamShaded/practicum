import { creation } from './modules/createInputs';

const modules = [
  creation,
];

const init = () => {
  modules.forEach((module: any) => {
    module.bindEvent();
  });
};

init();
