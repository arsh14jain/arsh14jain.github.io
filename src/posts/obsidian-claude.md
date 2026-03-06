# Building an AI thinking partner inside Obsidian

I've been using Claude Code for coding for a while now — writing features, debugging, the usual. And separately, I've been keeping an Obsidian vault where I dump thoughts, track projects, write daily notes. At some point I started pointing Claude Code at the vault just to see what would happen.

It turns out "what happens" is more interesting than I expected.

AI tools do remember context now — they're not stateless anymore. But the memory is surface-level. They know your name, your language preference, maybe that you like concise answers. They don't know what you're afraid of, what patterns you keep repeating, or what you're avoiding. The gap isn't memory — it's depth.

So I started building something that bridges that gap. An Obsidian vault where Claude Code reads everything you write, builds a real understanding of who you are, and gives you honest feedback. Not encouragement — feedback.

Repo: [`arsh14jain/obsidian-claude`](https://github.com/arsh14jain/obsidian-claude)

![Claude + Obsidian](/obsidian-claude.png)

---

## The idea

The core concept is a two-space workflow. You have your space in the vault, and Claude has its space. Neither touches the other's without permission.

Your space is `Atlas/`, `Calendar/`, and `Efforts/` — raw thoughts, daily notes, project tracking. You write freely without worrying about formatting or structure. This is your dump space.

Claude's space is `Claude's Thoughts/` — a set of notes that Claude maintains based on everything it reads in your space. A profile of who you are, an honest assessment of where you're at, ideas tailored to you, a synthesis of your values.

The separation matters more than it sounds. When you know Claude can't edit your notes, you write more freely. And when Claude has its own space to be honest, the feedback is sharper. It's not trying to be polite in your notes — it has its own place to say what it actually thinks.

---

## How it actually works

The day-to-day flow looks like this:

1. You write daily notes in `Calendar/`, dump thoughts in `Atlas/`, track projects in `Efforts/`
2. Run `/think` — Claude re-reads everything in the vault and updates all its notes with fresh insights
3. Run `/ask-me` — Claude asks thoughtful questions to build a deeper profile of you
4. Over time, the feedback loop tightens: you write more, Claude understands more, the insights get sharper

Here's the layout:

```
┌─────────────────────────────────────────────────┐
│                 Obsidian Vault                   │
│                                                  │
│  ┌──────────────────┐  ┌──────────────────────┐  │
│  │   YOUR SPACE     │  │   CLAUDE'S SPACE     │  │
│  │                  │  │                       │  │
│  │  Atlas/          │  │  Claude's Thoughts/   │  │
│  │  - raw thoughts  │  │  - Who You Are        │  │
│  │  - ideas         │  │  - Honest Assessment  │  │
│  │  - reflections   │  │  - Ideas for You      │  │
│  │  - links         │  │  - Mission & Values   │  │
│  │                  │  │  - Weekly Reviews     │  │
│  │  Calendar/       │  │                       │  │
│  │  - daily notes   │  │  Claude reads your    │  │
│  │  - weekly notes  │  │  space, thinks about  │  │
│  │                  │  │  it, and writes in    │  │
│  │  Efforts/        │  │  its own space.       │  │
│  │  - projects      │  │                       │  │
│  └──────────────────┘  └──────────────────────┘  │
│                                                  │
│  Claude NEVER edits your space without asking.    │
│  You can read Claude's space anytime.            │
└─────────────────────────────────────────────────┘
```

The whole thing runs through Claude Code's skills system — slash commands that each do something specific.

---

## The skills

**`/setup`** is the first-run onboarding. It introduces the two-space workflow, asks your name, and kicks off the profiling process. You run it once.

**`/ask-me`** is how Claude learns about you. It asks questions — not generic icebreakers, but things designed to surface what you actually care about, what you're afraid of, what patterns you keep repeating. You can steer it with a topic (`/ask-me career`) or let it pick. Answers get woven into Claude's Thoughts.

**`/think`** is the main feedback loop. Claude re-reads the entire vault — your notes, your daily entries, your projects — and updates all its notes with fresh insights. Run it after you've written a bunch and want Claude to catch up.

**`/project`** handles project management in natural language. `/project new side-project a distributed key-value store` creates a project note with status tracking, goals, and next steps. `/project update side-project` lets you update it conversationally.

**`/weekly-review`** synthesizes the past week from your `Calendar/` notes into a weekly review. It pulls out themes, progress, and patterns you might not notice day-to-day.

**`/sync-progress`** bridges external projects into the vault. Point it at a JSON file from another project, and it creates or updates vault notes to track that progress alongside everything else.

---

## What Claude's Thoughts actually look like

Claude's space has four main notes, each serving a different purpose.

**Who You Are** is a profile — not a bio, but a real picture. What excites you, how you work, what your patterns are, what your friends come to you for. This evolves every time you run `/ask-me` or `/think`.

**Honest Assessment** is where Claude says what it actually thinks. Where you're strong, where you're stuck, what you keep avoiding. This is the note most AI tools would never write — it's not encouraging, it's honest. If you're procrastinating on something important, it'll say so.

**Mission & Values** synthesizes what you seem to care about from your writing. Not what you say you value — what your notes actually reveal about your priorities.

**Ideas for You** is tailored suggestions — project ideas, career moves, experiments — based on everything Claude knows about you. Not generic "learn Rust" suggestions, but things that connect to your specific situation and interests.

---

## Why I built it this way

Most AI interactions are stateless in practice. You start a conversation, get your answer, and the context is gone. Some tools remember facts, but facts aren't understanding.

The idea here is different: what if an AI tool actually knew you? Not your preferences — you. Your patterns, your blind spots, the gap between what you say you want and what you actually do. That requires more than memory. It requires a place to accumulate observations over time.

Obsidian was the natural choice. It's local-first — everything is Markdown files on your machine. No cloud lock-in, no proprietary formats. You can open Claude's notes in any text editor and see exactly what it thinks. Delete anything you disagree with. The vault is yours.

The two-space model came from wanting trust on both sides. You need to write freely without worrying that Claude will "fix" your notes. Claude needs a place to be honest without softening things for your space. Separate spaces, clear boundaries, better output from both sides.

And everything is just Markdown and Claude Code skills — plain text files you can read, edit, fork, or extend. No plugins to install, no special infrastructure. Clone the repo, open it in Obsidian, run Claude Code.

---

## Try it

```bash
git clone https://github.com/arsh14jain/obsidian-claude.git
cd obsidian-claude
```

Open in Obsidian, run `claude` in the terminal, then `/setup`. That's it.

The whole thing is open source: [`arsh14jain/obsidian-claude`](https://github.com/arsh14jain/obsidian-claude)
