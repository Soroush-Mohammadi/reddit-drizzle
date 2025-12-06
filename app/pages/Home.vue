<template>

  <div class="flex justify-between items-center border-b p-1">
    <AtomsLogo />
    <TemplatesAppHeader />
    <AtomsLoginBtn />
  </div>
  <div class="grid grid-cols-7">
    <div class="bg-red-100">
      <TemplatesSideMenu />
    </div>
    <div class="col-start-3 col-span-3">
      <TemplatesMainContent />
    </div>
    <div class="bg-red-300">03</div>
    <div class="bg-red-400">04</div>

  </div>

</template>
