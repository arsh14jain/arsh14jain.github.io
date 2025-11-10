# Turning my old HP laptop into a home server

I usually spin up my small personal projects on platforms like **AWS**, **Hostinger**, and **Render**.  
Recently, I came across the [selfhosted subreddit](https://www.reddit.com/r/selfhosted/) and got curious about running something on my own.  

Initially, I thought about getting a **Raspberry Pi**. Then I remembered my old **HP ProBook (i5, 2016, 4GB RAM)** that’s been sitting around for years.  
It’s not exactly new, but it’s definitely more capable than a Pi. So I decided to turn it into a small home server.

![Alt text](/home-server.jpeg)


---

## Why I did it

Mostly curiosity.  
Cloud hosting is great, but you don’t really get to see how things work underneath.  
I wanted to set up something from scratch, manage it, and see how reliable I could make it.

---

## How I did it

Here’s a quick rundown of what I did before getting into the details:

- Found my old **HP ProBook (i5, 2016, 4GB RAM)** that was lying unused  
- Created a **bootable USB** with Ubuntu Server  
- Installed **Ubuntu Server** with a minimal setup (no desktop)  
- Installed **Docker Engine** to manage everything in containers  
- Deployed **n8n** using Docker for simple automation tasks  
- Configured **auto-restart** so everything comes back online after power cuts

That’s the rough flow. Below is how I set everything up step by step.

---

### Installing Ubuntu Server

I went with **Ubuntu Server** because it felt familiar.  
Back in college, I used **Ubuntu Desktop** quite a bit, so I figured this would be an easy transition.  
No need to learn something completely new.

Here’s how I installed it:

1. **Made a bootable USB**  
   I downloaded the Ubuntu Server ISO and flashed it to a USB drive using [balenaEtcher](https://etcher.balena.io/).  
   Pretty simple — select the ISO, plug in the USB, hit “Flash”.

2. **Booted into the installer**  
   Plugged the USB into the laptop, pressed `Esc` to open the HP boot menu, and selected the USB drive.

3. **Chose minimal setup**  
   No desktop environment. Just the basics.  
   The install process was straightforward — set language, network, user, and let it do its thing.

When it rebooted, I had a clean terminal-only system.  
No unnecessary packages, no distractions — just what I needed.

---

### Setting up Docker

Next, I installed **Docker Engine** to keep everything containerized and easy to rebuild later.

```bash
sudo apt update && sudo apt install -y docker.io
sudo systemctl enable --now docker
```

After that, I pulled and ran n8n, which I use for small automations.

```bash
docker run -d --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  --restart=always \
  n8nio/n8n
```

That `--restart=always` flag makes sure n8n starts automatically whenever the system reboots.

---

### Handling power cuts ⚡

The laptop’s battery is completely dead, so it shuts off the moment power goes out.  
We do have a power backup at home, but there’s usually a short gap of a few seconds before it kicks in.  
That means the laptop fully powers off and then boots back up once backup power comes on.

To make sure everything recovers automatically, I set up the following:

- **Auto power-on:** enabled the *“Power on AC restore”* option in the BIOS so the laptop turns itself on as soon as power returns.  
- **Docker auto-start:** enabled Docker to start on boot:  
  ```sudo systemctl enable docker```
- **Container recovery:** used the `--restart=always` flag in the `docker run` command so containers restart automatically after reboot.

With this setup, even if the power drops for a few seconds, the laptop powers back on by itself, Docker starts up, and n8n is running again within a minute — no manual steps needed.

---
### Accessing it from my Mac

I don’t really use the laptop directly — it just sits in a corner and runs.  
Whenever I need to do anything, I connect to it over **SSH** from my Mac.

Once Ubuntu was installed, I noted its local IP address using `ip a` on the laptop.  
Then, from my Mac terminal, I just run:

`ssh username@192.168.x.x`

I also added my SSH key so I don’t have to type the password every time:

`ssh-copy-id username@192.168.x.x`

---

## What I use it for

Right now, I’m running **n8n** on it.  
It handles a few small things — running scheduled scripts, hitting APIs, or connecting tools I use often.  
Nothing fancy, just small automations that I don’t want to keep on my main machine.

At some point, I might also try a few other things on it:

- setting up **Pi-hole** for ad blocking  
- using it as a **file server** for backups  
- maybe running **Home Assistant** for some home automation  
- experimenting with **Grafana** to track system stats

## Final thoughts

Cloud hosting will always be the better choice for production apps.
But doing this was worth it — I learned a lot about setup, networking, and how to make a system recover from power loss.
And it’s satisfying to have something you built running on hardware you already owned.

If you’ve got an old laptop lying around, give this a try.
You might actually enjoy it.