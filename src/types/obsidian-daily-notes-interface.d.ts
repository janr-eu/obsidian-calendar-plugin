// Augment the incomplete type definitions from obsidian-daily-notes-interface
// The implementation has these functions but the package's index.d.ts is outdated

declare module "obsidian-daily-notes-interface" {
  import type { Moment } from "moment";
  import type { TFile } from "obsidian";

  // Re-export the base types
  export interface IDailyNoteSettings {
    folder?: string;
    format?: string;
    template?: string;
  }

  export interface IDailyNote {
    file: TFile;
    date: Moment;
  }

  // Daily notes (already in package)
  export function appHasDailyNotesPluginLoaded(): boolean;
  export function createDailyNote(date: Moment): Promise<TFile>;
  export function getDailyNote(date: Moment, dailyNotes: IDailyNote[]): TFile;
  export function getAllDailyNotes(): Record<string, TFile>;
  export function getDailyNoteSettings(): IDailyNoteSettings;

  // Weekly notes
  export function appHasWeeklyNotesPluginLoaded(): boolean;
  export function createWeeklyNote(date: Moment): Promise<TFile>;
  export function getWeeklyNote(date: Moment, weeklyNotes: Record<string, TFile>): TFile;
  export function getAllWeeklyNotes(): Record<string, TFile>;
  export function getWeeklyNoteSettings(): IDailyNoteSettings;

  // Monthly notes (missing from package types)
  export function appHasMonthlyNotesPluginLoaded(): boolean;
  export function createMonthlyNote(date: Moment): Promise<TFile>;
  export function getMonthlyNote(date: Moment, monthlyNotes: Record<string, TFile>): TFile;
  export function getAllMonthlyNotes(): Record<string, TFile>;
  export function getMonthlyNoteSettings(): IDailyNoteSettings;

  // Quarterly notes (missing from package types)
  export function appHasQuarterlyNotesPluginLoaded(): boolean;
  export function createQuarterlyNote(date: Moment): Promise<TFile>;
  export function getQuarterlyNote(date: Moment, quarterlyNotes: Record<string, TFile>): TFile;
  export function getAllQuarterlyNotes(): Record<string, TFile>;
  export function getQuarterlyNoteSettings(): IDailyNoteSettings;

  // Yearly notes (missing from package types)
  export function appHasYearlyNotesPluginLoaded(): boolean;
  export function createYearlyNote(date: Moment): Promise<TFile>;
  export function getYearlyNote(date: Moment, yearlyNotes: Record<string, TFile>): TFile;
  export function getAllYearlyNotes(): Record<string, TFile>;
  export function getYearlyNoteSettings(): IDailyNoteSettings;

  // Default formats
  export const DEFAULT_DAILY_NOTE_FORMAT: string;
  export const DEFAULT_WEEKLY_NOTE_FORMAT: string;
  export const DEFAULT_MONTHLY_NOTE_FORMAT: string;
  export const DEFAULT_QUARTERLY_NOTE_FORMAT: string;
  export const DEFAULT_YEARLY_NOTE_FORMAT: string;

  // Template utilities
  export function getTemplateInfo(template: string): Promise<string>;
  export function getDateUID(date: Moment, granularity?: string): string;
  export function getDateFromFile(file: TFile, granularity: string): Moment | null;
  export function getDateFromPath(path: string, granularity: string): Moment | null;

  // Periodic notes (generic)
  export function getPeriodicNoteSettings(granularity: string): IDailyNoteSettings;
  export function createPeriodicNote(granularity: string, date: Moment): Promise<TFile>;
}
