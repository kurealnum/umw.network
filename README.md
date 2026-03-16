# umw.network

A webring for University of Mary Washington students.

Adapted from [uwaterloo.network](https://uwaterloo.network), with credit to the original project.

---

## Join the Webring

**Requirements:** University of Mary Washington student + personal website

### 1. Add your photo

Save a square image (400x400px) to:

```
public/photos/your-name.jpg
```

### 2. Add yourself to `src/data/members.ts`

```typescript
{
  id: "your-name",
  name: "Your Name",
  website: "https://yourwebsite.com",
  profilePic: "/photos/your-name.jpg",
  connections: ["friend-name"],  // friends in the webring
},
```

Optional fields: `program`, `year`, `instagram`, `twitter`, `bluesky`, `linkedin` (use full URLs)

### 3. Submit a pull request

---

## Add the Widget to Your Site

```html
<script
  src="https://umw.network/embed.js"
  data-webring
  data-user="your-name"
></script>
```

**What it does:**

- Center icon → links to [umw.network](https://umw.network)
- Arrows → open your connections' websites

**Customize:** Add `data-color="red"` or `data-arrow="chevron"` for different styles.

---

## Requesting new roles/verticals

Open a PR!

## Credits

Based on the original `uwaterloo.network` project by shayaan, kevin, daniel, and casper.
