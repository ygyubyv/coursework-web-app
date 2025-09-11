<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-6">
      <div
        class="flex flex-col md:flex-row rounded-xl shadow-sm bg-white overflow-hidden min-h-[80vh]"
      >
        <aside
          class="w-full md:w-48 lg:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 p-4 bg-gray-50"
        >
          <nav
            class="flex md:flex-col space-x-4 md:space-x-0 md:space-y-1 overflow-x-auto"
          >
            <RouterLink
              to="/account/profile"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-100 whitespace-nowrap"
              active-class="bg-gray-200 text-black"
            >
              <font-awesome-icon :icon="['fas', 'user']" />
              Personal Info
            </RouterLink>

            <RouterLink
              to="/account/payments"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-100 whitespace-nowrap"
              active-class="bg-gray-200 text-black"
            >
              <font-awesome-icon :icon="['fas', 'credit-card']" />
              Payments
            </RouterLink>

            <RouterLink
              to="/account/stats"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-100 whitespace-nowrap"
              active-class="bg-gray-200 text-black"
            >
              <font-awesome-icon :icon="['fas', 'chart-line']" />
              Statistics
            </RouterLink>

            <RouterLink
              to="/account/settings"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-100 whitespace-nowrap"
              active-class="bg-gray-200 text-black"
            >
              <font-awesome-icon :icon="['fas', 'cog']" />
              Settings
            </RouterLink>

            <RouterLink
              to="/account/security"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-100 whitespace-nowrap"
              active-class="bg-gray-200 text-black"
            >
              <font-awesome-icon :icon="['fas', 'shield-alt']" />
              Security
            </RouterLink>
          </nav>
        </aside>

        <main class="flex-1 p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </section>
</template>

<style scoped>
aside nav::-webkit-scrollbar {
  height: 3px;
}
aside nav::-webkit-scrollbar-thumb {
  background: #000;
}
</style>
