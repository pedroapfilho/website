import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "/uses — Pedro Filho",
  description:
    "Hardware and local development software used by Pedro Filho.",
};

const useGroups = [
  {
    title: "Hardware",
    sections: [
      {
        title: "Computer",
        items: [
          {
            name: "Apple MacBook Pro with M5 Max, 48 GB memory, 2 TB SSD",
            href: "https://www.apple.com/macbook-pro/",
          },
        ],
      },
      {
        title: "Displays",
        items: [
          {
            name: "Dell 27 4K USB-C Hub Monitor - P2723QE",
            href: "https://www.dell.com/en-us/shop/dell-27-4k-usb-c-hub-monitor-p2723qe/apd/210-bdlk/monitors-monitor-accessories",
          },
          {
            name: "Dell Pro 27 Plus 4K USB-C Hub Monitor - P2725QE",
            href: "https://www.dell.com/en-us/shop/dell-pro-27-plus-4k-usb-c-hub-monitor-p2725qe/apd/210-brjb/monitors-monitor-accessories",
          },
        ],
      },
      {
        title: "Docking",
        items: [
          {
            name: "CalDigit Thunderbolt 4 Pro Dock",
            href: "https://www.apple.com/shop/product/hrjk2zm/a/caldigit-thunderbolt-4-pro-dock",
          },
          {
            name: "CalDigit Element Hub",
            href: "https://www.caldigit.com/thunderbolt-4-element-hub/",
          },
        ],
      },
      {
        title: "Input",
        items: [
          {
            name: "Kinesis Advantage360 Professional",
            href: "https://kinesis-ergo.com/shop/adv360pro/",
          },
          {
            name: "Logitech MX Master 4",
            href: "https://www.logitech.com/en-us/shop/p/mx-master-4",
          },
          {
            name: "Elgato Stream Deck",
            href: "https://www.elgato.com/us/en/s/welcome-to-stream-deck",
          },
        ],
      },
      {
        title: "Ergonomics",
        items: [
          {
            name: "DeltaHub Carpio 2.0",
            href: "https://deltahub.io/products/carpio-ergonomic-wrist-rest",
          },
          {
            name: "Herman Miller Aeron Chair",
            href: "https://www.hermanmiller.com/products/seating/office-chairs/aeron-chair/",
          },
        ],
      },
      {
        title: "Audio",
        items: [
          {
            name: "Electro-Voice RE20",
            href: "https://products.electrovoice.com/na/en/re20",
          },
          {
            name: "Rode PSA1 Studio Arm",
            href: "https://rode.com/en-us/products/psa1",
          },
          {
            name: "Solid State Logic SSL 2+",
            href: "https://solidstatelogic.com/products/ssl-2-plus-mkii",
          },
          {
            name: "Edifier R990BT",
            href: "https://www.edifier.com/global/p/bookshelf-speakers/r990bt",
          },
          {
            name: "Audio-Technica ATH-M50x",
            href: "https://www.audio-technica.com/en-us/ath-m50x",
          },
        ],
      },
      {
        title: "Video",
        items: [
          {
            name: "Sony Alpha 7 IV",
            href: "https://electronics.sony.com/imaging/interchangeable-lens-cameras/full-frame/p/ilce7m4-b",
          },
          {
            name: "Sony FE 35mm F1.4 GM",
            href: "https://electronics.sony.com/imaging/lenses/full-frame-e-mount/p/sel35f14gm",
          },
          {
            name: "Opal C1",
            href: "https://opalcamera.com/",
          },
        ],
      },
      {
        title: "Lighting",
        items: [
          {
            name: "Logitech Litra Glow",
            href: "https://www.logitech.com/en-us/shop/p/litra-glow.946-000001",
          },
        ],
      },
      {
        title: "Security",
        items: [
          {
            name: "Yubico YubiKey",
            href: "https://www.yubico.com/products/yubikey-5-overview/",
          },
        ],
      },
      {
        title: "3D Printing",
        items: [
          {
            name: "Original Prusa MK4",
            href: "https://help.prusa3d.com/product/mk4",
          },
        ],
      },
    ],
  },
  {
    title: "Development Software",
    sections: [
      {
        title: "Editor",
        items: [
          {
            name: "Zed",
            href: "https://zed.dev/",
          },
          {
            name: "Neovim",
            href: "https://neovim.io/",
          },
        ],
      },
      {
        title: "Terminal",
        items: [
          {
            name: "Ghostty",
            href: "https://ghostty.org/",
          },
          {
            name: "cmux",
            href: "https://cmux.com/",
          },
        ],
      },
      {
        title: "Agent Orchestration",
        items: [
          {
            name: "Conductor",
            href: "https://conductor.build/",
          },
        ],
      },
      {
        title: "Containers",
        items: [
          {
            name: "OrbStack",
            href: "https://orbstack.dev/",
          },
        ],
      },
      {
        title: "Package Management",
        items: [
          {
            name: "fnm",
            href: "https://github.com/Schniz/fnm",
          },
        ],
      },
      {
        title: "Browser",
        items: [
          {
            name: "Helium",
            href: "https://helium.computer/",
          },
        ],
      },
    ],
  },
];

const UsesPage = () => (
  <main className="isolate flex flex-1 flex-col">
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-6 pt-14 pb-12 sm:px-12 sm:pt-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-medium tracking-tight text-balance">
          /uses
        </h1>
        <p className="max-w-[64ch] text-base text-pretty sm:text-sm">
          Hardware connected to my computer and development software I use
          locally.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {useGroups.map((group) => (
          <section key={group.title} className="flex flex-col gap-4">
            <h2 className="text-base font-medium">{group.title}</h2>
            <dl className="border-t border-primary-foreground/10">
              {group.sections.map((section) => (
                <div
                  key={section.title}
                  className="grid gap-2 border-b border-primary-foreground/10 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className="font-medium">{section.title}</dt>
                  <dd>
                    <ul role="list" className="flex flex-col gap-1">
                      {section.items.map((item) => (
                        <li key={item.href} className="text-base sm:text-sm">
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-primary-foreground/30 underline-offset-4 hover:decoration-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  </main>
);

export default UsesPage;
