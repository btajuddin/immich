<script lang="ts">
  import ServerStatsPanel from '$lib/components/admin-page/server-stats/server-stats-panel.svelte';
  import UserPageLayout from '$lib/components/layouts/user-page-layout.svelte';
  import { api } from '@api';
  import { onDestroy, onMount } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let setIntervalHandler: ReturnType<typeof setInterval>;

  onMount(async () => {
    setIntervalHandler = setInterval(async () => {
      const { data: stats } = await api.serverInfoApi.getServerStatistics();
      data.stats = stats;
    }, 5000);
  });

  onDestroy(() => {
    clearInterval(setIntervalHandler);
  });
</script>

<UserPageLayout user={data.user} title={data.meta.title} admin>
  <section id="setting-content" class="flex place-content-center sm:mx-4">
    <section class="w-full pb-28 sm:w-5/6 md:w-[850px]">
      <ServerStatsPanel stats={data.stats} />
    </section>
  </section>
</UserPageLayout>
