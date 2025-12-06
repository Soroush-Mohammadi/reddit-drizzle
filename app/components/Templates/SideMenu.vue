<script setup>


</script>


<template>
    <div class="border-r pt-5">
        <div class="flex flex-col gap-y-5 justify-center px-3">
            <MoleculesDropDown />
            <OrganismsSidebarSection>
                <template #title>
                    RESOURCES
                </template>
            </OrganismsSidebarSection>
            <OrganismsSidebarSection>
                <template #title>
                    COMMUNITIES
                </template>
            </OrganismsSidebarSection>
            <OrganismsSidebarSection>
                <template #title>
                    CUSTOME FEEDS
                </template>
            </OrganismsSidebarSection>
        </div>
    </div>
</template>