import { countThisStuff } from './modules/countThisStuff';
import { creation } from './modules/createInputs';

const modules = [
  creation,
  countThisStuff,
];

const init = () => {
  modules.forEach((module: any) => {
    module.bindEvent();
  });
};

init();
