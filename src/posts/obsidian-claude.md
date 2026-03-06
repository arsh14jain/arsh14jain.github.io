# Building an AI thinking partner inside Obsidian

I've been using Claude Code for coding for a while now. Writing features, debugging, the usual. And separately, I've had this Obsidian vault where I dump thoughts, track projects, write daily notes. At some point I just started pointing Claude Code at the vault to see what would happen.

Turns out it's more interesting than I expected.

AI tools do remember context now. They're not stateless anymore. But the memory is pretty surface-level. They know your name, your language preference, maybe that you like concise answers. They don't know what you're afraid of, what patterns you keep repeating, or what you're avoiding. The gap isn't memory. It's depth.

So I started building something that bridges that gap. An Obsidian vault where Claude Code reads everything you write, builds a real understanding of who you are, and gives you honest feedback. Not encouragement. Feedback.

Repo: [`arsh14jain/obsidian-claude`](https://github.com/arsh14jain/obsidian-claude)

![Claude + Obsidian](/obsidian-claude.png)

---

## The idea

The core concept is pretty simple. A two-space workflow. You have your space in the vault, Claude has its space. Neither touches the other's without permission.

Your space is `Atlas/`, `Calendar/`, and `Efforts/`. Raw thoughts, daily notes, project tracking. You write freely without worrying about formatting or structure. It's your dump space.

Claude's space is `Claude's Thoughts/`. A set of notes that Claude maintains based on everything it reads in your space. A profile of who you are, an honest assessment of where you're at, ideas tailored to you, a synthesis of your values.

The separation matters more than it sounds. When you know Claude can't touch your notes, you write more freely. And when Claude has its own space to be honest, the feedback gets sharper. It's not trying to be polite in your notes. It has its own place to say what it actually thinks.

---

## How it actually works

The day to day flow is pretty straightforward:

1. You write daily notes in `Calendar/`, dump thoughts in `Atlas/`, track projects in `Efforts/`
2. Run `/think`. Claude re-reads everything in the vault and updates all its notes with fresh insights
3. Run `/ask-me`. Claude asks you thoughtful questions to build a deeper profile
4. Over time, the feedback loop tightens. You write more, Claude understands more, the insights get sharper

Here's what the layout looks like:

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

The whole thing runs through Claude Code's skills system. Basically slash commands that each do something specific.

---

## The skills

**`/setup`** is the first-run onboarding. Introduces the two-space workflow, asks your name, kicks off the profiling process. You run it once.

**`/ask-me`** is how Claude learns about you. It asks questions. Not generic icebreakers, but stuff designed to surface what you actually care about, what you're afraid of, what patterns you keep repeating. You can steer it with a topic (`/ask-me career`) or just let it pick. Answers get woven into Claude's Thoughts.

**`/think`** is the main feedback loop. Claude re-reads the entire vault (your notes, daily entries, projects, everything) and updates all its notes with fresh insights. Run it after you've written a bunch and want Claude to catch up.

**`/project`** handles project management in natural language. `/project new side-project a distributed key-value store` creates a project note with status tracking, goals, and next steps. `/project update side-project` lets you update it conversationally.

**`/weekly-review`** pulls together the past week from your `Calendar/` notes into a weekly review. Themes, progress, patterns you might not notice day to day.

**`/sync-progress`** bridges external projects into the vault. Point it at a JSON file from another project and it creates or updates vault notes to track that progress alongside everything else.

---

## What Claude's Thoughts actually look like

Claude's space has four main notes, each doing something different.

**Who You Are** is a profile. Not a bio, more like a real picture of you. What excites you, how you work, what your patterns are, what your friends come to you for. It evolves every time you run `/ask-me` or `/think`.

**Honest Assessment** is where Claude says what it actually thinks. Where you're strong, where you're stuck, what you keep avoiding. This is the note most AI tools would never write. It's not encouraging, it's honest. If you're procrastinating on something important, it'll say so.

**Mission & Values** synthesizes what you seem to care about based on your writing. Not what you say you value, but what your notes actually reveal about your priorities.

**Ideas for You** is tailored suggestions (project ideas, career moves, experiments) based on everything Claude knows about you. Not generic "learn Rust" stuff, but things that connect to your specific situation and interests.

---

## Why I built it this way

Most AI interactions are basically stateless. You start a conversation, get your answer, and the context is gone. Some tools remember facts, but facts aren't understanding.

The question I kept coming back to: what if an AI tool actually knew you? Not your preferences. You. Your patterns, your blind spots, the gap between what you say you want and what you actually do. That takes more than memory. It takes a place to accumulate observations over time.

Obsidian was the obvious choice. It's local-first. Everything is just Markdown files on your machine. No cloud lock-in, no proprietary formats. You can open Claude's notes in any text editor and see exactly what it thinks. Delete anything you disagree with. The vault is yours.

The two-space model came from wanting trust on both sides. You need to write freely without worrying that Claude will "fix" your notes. Claude needs a place to be honest without softening things for your space. Separate spaces, clear boundaries, better output from both sides.

And everything is just Markdown and Claude Code skills. Plain text files you can read, edit, fork, or extend. No plugins to install, no special infrastructure. Clone the repo, open it in Obsidian, run Claude Code.

---

## Try it

```bash
git clone https://github.com/arsh14jain/obsidian-claude.git
cd obsidian-claude
```

Open it in Obsidian, run `claude` in the terminal, then `/setup`. That's it.

The whole thing is open source: [`arsh14jain/obsidian-claude`](https://github.com/arsh14jain/obsidian-claude)
