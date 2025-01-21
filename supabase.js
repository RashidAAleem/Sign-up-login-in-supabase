import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const projectUrl = "https://iljsehndhytyiougjhmg.supabase.co";
const projectApi = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsanNlaG5kaHl0eWlvdWdqaG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0ODgxNjAsImV4cCI6MjA1MjA2NDE2MH0.yowQbGQfJIgCCdweM4YC4UzT3Wrmrpx-bIWQyDM8aZ4";
export const supabase = createClient(projectUrl, projectApi)







