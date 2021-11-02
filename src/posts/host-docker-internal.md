---
template: blog
path: /blog/host-docker-internal
title: "Docker: How to connect from container to Host"
date: "5/3/2020"
excerpt: Don't have time to dockerize everything? This blog post shows what can be done for that.
---

_Note 6/6/2020: This only works on Macs and Windows, but if you know how to make it work on Linux leave a comment on Github_

Yes, I don't just do frontend development. I know some Docker. Just recently, I wanted to connect the APIs inside my docker-containers to what was outside my docker containers, the host.

I tried doing `http://localhost:8080`, but I realized I am a silly goose! That's within the container, so that will not work.

Turns out docker has a special keyword [^1] :

```
host.docker.internal
```

Now, in docker-compose, whenever I want to setup a [Hasura Event Trigger](https://hasura.io/docs/1.0/graphql/manual/event-triggers/index.html), and I haven't dockerize my app yet, all I need to do is the following things:

1. Never hardcode the event trigger, use a environment varaible.
2. In docker-compose, I can use the following:

```yaml
EVENT_TRIGGER: http://host.docker.internal:8080
```

[^1]: https://docs.docker.com/docker-for-mac/networking/#there-is-no-docker0-bridge-on-macos
