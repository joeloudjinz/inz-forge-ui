# HyperUI Accordion - Angular Component

Design Source: https://www.hyperui.dev/components/application/accordions

# Examples of the Original Designs

## Simple & Light

```html

<div class="space-y-2">
  <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
      <span>What are the basic features?</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
      <span>How do I get started?</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
      <span>What support options are available?</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>
</div>
```

## Simple & Dark

```html

<div class="space-y-2">
  <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
      <span>What are the basic features?</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
      <span>How do I get started?</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
      <span>What support options are available?</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>
</div>
```

## Simple with Icons & Light

```html

<div class="space-y-2">
  <details class="group [&amp;_summary::-webkit-details-marker]:hidden" open="">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
      <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
        </svg>

        Getting Started
      </span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
      <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
        </svg>

        Configuration
      </span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
      <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"></path>
        </svg>

        Troubleshooting
      </span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>
</div>
```

## Simple with Icons & Dark

```html

<div class="space-y-2">
  <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
      <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
        </svg>

        Getting Started
      </span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
      <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
        </svg>

        Configuration
      </span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
      <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"></path>
        </svg>

        Troubleshooting
      </span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-4">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>
</div>
```

## Divided

```html

<div class="-mx-4 -my-2 space-y-0 divide-y divide-gray-200">
  <details class="group px-4 py-3 [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 font-medium text-gray-900 hover:text-gray-700">
      <span>Account Settings</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="py-4">
      <p class="text-gray-700">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group px-4 py-3 [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 font-medium text-gray-900 hover:text-gray-700">
      <span>Privacy &amp; Permissions</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="py-4">
      <p class="text-gray-700">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group px-4 py-3 [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 font-medium text-gray-900 hover:text-gray-700">
      <span>Notifications &amp; Alerts</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="py-4">
      <p class="text-gray-700">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>
</div>
```

## Divided & Dark
```html
<div class="-mx-4 -my-2 space-y-0 divide-y divide-gray-200 dark:divide-gray-700">
  <details class="group px-4 py-3 [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200">
      <span>Account Settings</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="py-4">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group px-4 py-3 [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200">
      <span>Privacy &amp; Permissions</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="py-4">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group px-4 py-3 [&amp;_summary::-webkit-details-marker]:hidden">
    <summary class="flex cursor-pointer items-center justify-between gap-4 font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200">
      <span>Notifications &amp; Alerts</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="py-4">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>
</div>
```
## Compact & Light
```html
<div class="space-y-2">
  <details class="group space-y-2 [&amp;_summary::-webkit-details-marker]:hidden" open="">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
      <span>Team Settings</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="space-y-2 pl-4">
      <details class="group/members [&amp;_summary::-webkit-details-marker]:hidden">
        <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
          <span>Members</span>

          <svg class="size-4 shrink-0 transition-transform duration-300 group-open/members:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </summary>

        <div class="p-4">
          <p class="text-gray-700">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae
            hic dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut
            minus iste odio consectetur molestias iusto cupiditate ullam laborum veniam quos
            officia. Quos, temporibus perspiciatis!
          </p>
        </div>
      </details>

      <details class="group/roles [&amp;_summary::-webkit-details-marker]:hidden">
        <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
          <span>Roles &amp; Permissions</span>

          <svg class="size-4 shrink-0 transition-transform duration-300 group-open/roles:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </summary>

        <div class="p-4">
          <p class="text-gray-700">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae
            hic dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut
            minus iste odio consectetur molestias iusto cupiditate ullam laborum veniam quos
            officia. Quos, temporibus perspiciatis!
          </p>
        </div>
      </details>
    </div>
  </details>

  <details class="group space-y-2 [&amp;_summary::-webkit-details-marker]:hidden" open="">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
      <span>Integration Settings</span>

      <svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="space-y-2 pl-4">
      <details class="group/keys [&amp;_summary::-webkit-details-marker]:hidden" open="">
        <summary class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
          <span>API Keys</span>

          <svg class="size-4 shrink-0 transition-transform duration-300 group-open/keys:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </summary>

        <div class="p-4">
          <p class="text-gray-700">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae
            hic dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut
            minus iste odio consectetur molestias iusto cupiditate ullam laborum veniam quos
            officia. Quos, temporibus perspiciatis!
          </p>
        </div>
      </details>
    </div>
  </details>
</div>
```

## Compact & Dark
```html
<div class="space-y-1">
  <details class="group [&amp;_summary::-webkit-details-marker]:hidden" open="">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
      <span>Storage &amp; Limits</span>

      <svg class="size-4 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-3">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group [&amp;_summary::-webkit-details-marker]:hidden" open="">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
      <span>Active Sessions</span>

      <svg class="size-4 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-3">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>

  <details class="group [&amp;_summary::-webkit-details-marker]:hidden" open="">
    <summary class="flex cursor-pointer items-center justify-between gap-4 rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
      <span>Billing History</span>

      <svg class="size-4 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>

    <div class="p-3">
      <p class="text-gray-700 dark:text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique, quae hic
        dicta quo facere facilis praesentium a sunt, est quia pariatur nam, modi aut minus iste
        odio consectetur molestias iusto cupiditate ullam laborum veniam quos officia. Quos,
        temporibus perspiciatis!
      </p>
    </div>
  </details>
</div>
```
