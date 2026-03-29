-- Neetcode Clone: Supabase Database Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Progress table: stores which problems each user has completed
create table if not exists progress (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  problem_slug text not null,
  completed_at timestamptz default now() not null,
  unique(user_id, problem_slug)
);

-- Index for fast lookups by user
create index if not exists idx_progress_user_id on progress(user_id);

-- Enable Row Level Security
alter table progress enable row level security;

-- Policy: users can only read their own progress
create policy "Users can read own progress"
  on progress for select
  using (auth.uid() = user_id);

-- Policy: users can insert their own progress
create policy "Users can insert own progress"
  on progress for insert
  with check (auth.uid() = user_id);

-- Policy: users can delete their own progress
create policy "Users can delete own progress"
  on progress for delete
  using (auth.uid() = user_id);
