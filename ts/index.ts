const modules = [

];

const init = () => {
  modules.forEach((module: any) => {
    module.bindEvent();
  });
};

init();
