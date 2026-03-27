<svelte:options immutable />

<script lang="ts">
  import type { Moment } from "moment";
  import {
    Calendar as CalendarBase,
    ICalendarSource,
    configureGlobalMomentLocale,
  } from "obsidian-calendar-ui";
  import { onDestroy } from "svelte";

  import type { ISettings } from "src/settings";
  import { 
    appHasPeriodicNotesPluginLoaded,
    appHasMonthlyNotesEnabled,
    appHasQuarterlyNotesEnabled,
    appHasYearlyNotesEnabled
  } from "src/settings";
  import { activeFile, dailyNotes, settings, weeklyNotes, monthlyNotes, quarterlyNotes, yearlyNotes } from "./stores";

  let today: Moment;

  $: today = getToday($settings);

  export let displayedMonth: Moment = today;
  export let sources: ICalendarSource[];
  export let onHoverDay: (date: Moment, targetEl: EventTarget) => boolean;
  export let onHoverWeek: (date: Moment, targetEl: EventTarget) => boolean;
  export let onClickDay: (date: Moment, isMetaPressed: boolean) => boolean;
  export let onClickWeek: (date: Moment, isMetaPressed: boolean) => boolean;
  export let onClickMonth: (date: Moment, isMetaPressed: boolean) => void;
  export let onClickQuarter: (date: Moment, isMetaPressed: boolean) => void;
  export let onClickYear: (date: Moment, isMetaPressed: boolean) => void;
  export let onContextMenuDay: (date: Moment, event: MouseEvent) => boolean;
  export let onContextMenuWeek: (date: Moment, event: MouseEvent) => boolean;

  export function tick() {
    today = window.moment();
  }

  function getToday(settings: ISettings) {
    configureGlobalMomentLocale(settings.localeOverride, settings.weekStart);
    dailyNotes.reindex();
    weeklyNotes.reindex();
    monthlyNotes.reindex();
    quarterlyNotes.reindex();
    yearlyNotes.reindex();
    return window.moment();
  }

  // Check each periodic note type separately to conditionally enable click handlers
  $: hasMonthlyNotes = appHasMonthlyNotesEnabled();
  $: hasQuarterlyNotes = appHasQuarterlyNotesEnabled();
  $: hasYearlyNotes = appHasYearlyNotesEnabled();
  
  // Debug logging
  $: {
    console.log('Periodic Notes Status:', {
      monthly: hasMonthlyNotes,
      quarterly: hasQuarterlyNotes,
      yearly: hasYearlyNotes
    });
  }

  // 1 minute heartbeat to keep `today` reflecting the current day
  let heartbeat = setInterval(() => {
    tick();

    const isViewingCurrentMonth = displayedMonth.isSame(today, "day");
    if (isViewingCurrentMonth) {
      // if it's midnight on the last day of the month, this will
      // update the display to show the new month.
      displayedMonth = today;
    }
  }, 1000 * 60);

  onDestroy(() => {
    clearInterval(heartbeat);
  });
</script>

<CalendarBase
  {sources}
  {today}
  {onHoverDay}
  {onHoverWeek}
  {onContextMenuDay}
  {onContextMenuWeek}
  {onClickDay}
  {onClickWeek}
  onClickMonth={hasMonthlyNotes ? onClickMonth : null}
  onClickQuarter={hasQuarterlyNotes ? onClickQuarter : null}
  onClickYear={hasYearlyNotes ? onClickYear : null}
  bind:displayedMonth
  localeData={today.localeData()}
  selectedId={$activeFile}
  showWeekNums={$settings.showWeeklyNote}
/>
