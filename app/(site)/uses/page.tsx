import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Hardware and local development software used by Pedro Filho.",
  title: "/uses — Pedro Filho",
};

const useGroups = [
  {
    sections: [
      {
        items: [
          {
            href: "https://www.apple.com/macbook-pro/",
            name: "Apple MacBook Pro with M5 Max, 48 GB memory, 2 TB SSD",
          },
        ],
        title: "Computer",
      },
      {
        items: [
          {
            href: "https://www.dell.com/en-us/shop/dell-27-4k-usb-c-hub-monitor-p2723qe/apd/210-bdlk/monitors-monitor-accessories",
            name: "Dell 27 4K USB-C Hub Monitor - P2723QE",
          },
          {
            href: "https://www.dell.com/en-us/shop/dell-pro-27-plus-4k-usb-c-hub-monitor-p2725qe/apd/210-brjb/monitors-monitor-accessories",
            name: "Dell Pro 27 Plus 4K USB-C Hub Monitor - P2725QE",
          },
        ],
        title: "Displays",
      },
      {
        items: [
          {
            href: "https://www.apple.com/shop/product/hrjk2zm/a/caldigit-thunderbolt-4-pro-dock",
            name: "CalDigit Thunderbolt 4 Pro Dock",
          },
          {
            href: "https://www.caldigit.com/thunderbolt-4-element-hub/",
            name: "CalDigit Element Hub",
          },
        ],
        title: "Docking",
      },
      {
        items: [
          {
            href: "https://kinesis-ergo.com/shop/adv360pro/",
            name: "Kinesis Advantage360 Professional",
          },
          {
            href: "https://www.logitech.com/en-us/shop/p/mx-master-4",
            name: "Logitech MX Master 4",
          },
          {
            href: "https://www.elgato.com/us/en/s/welcome-to-stream-deck",
            name: "Elgato Stream Deck",
          },
        ],
        title: "Input",
      },
      {
        items: [
          {
            href: "https://deltahub.io/products/carpio-ergonomic-wrist-rest",
            name: "DeltaHub Carpio 2.0",
          },
          {
            href: "https://www.hermanmiller.com/products/seating/office-chairs/aeron-chair/",
            name: "Herman Miller Aeron Chair",
          },
        ],
        title: "Ergonomics",
      },
      {
        items: [
          {
            href: "https://products.electrovoice.com/na/en/re20",
            name: "Electro-Voice RE20",
          },
          {
            href: "https://rode.com/en-us/products/psa1",
            name: "Rode PSA1 Studio Arm",
          },
          {
            href: "https://solidstatelogic.com/products/ssl-2-plus-mkii",
            name: "Solid State Logic SSL 2+",
          },
          {
            href: "https://www.edifier.com/global/p/bookshelf-speakers/r990bt",
            name: "Edifier R990BT",
          },
          {
            href: "https://www.audio-technica.com/en-us/ath-m50x",
            name: "Audio-Technica ATH-M50x",
          },
        ],
        title: "Audio",
      },
      {
        items: [
          {
            href: "https://electronics.sony.com/imaging/interchangeable-lens-cameras/full-frame/p/ilce7m4-b",
            name: "Sony Alpha 7 IV",
          },
          {
            href: "https://electronics.sony.com/imaging/lenses/full-frame-e-mount/p/sel35f14gm",
            name: "Sony FE 35mm F1.4 GM",
          },
          {
            href: "https://opalcamera.com/",
            name: "Opal C1",
          },
        ],
        title: "Video",
      },
      {
        items: [
          {
            href: "https://www.logitech.com/en-us/shop/p/litra-glow.946-000001",
            name: "Logitech Litra Glow",
          },
        ],
        title: "Lighting",
      },
      {
        items: [
          {
            href: "https://www.yubico.com/products/yubikey-5-overview/",
            name: "Yubico YubiKey",
          },
        ],
        title: "Security",
      },
      {
        items: [
          {
            href: "https://help.prusa3d.com/product/mk4",
            name: "Original Prusa MK4",
          },
        ],
        title: "3D Printing",
      },
    ],
    title: "Hardware",
  },
  {
    sections: [
      {
        items: [
          {
            href: "https://zed.dev/",
            name: "Zed",
          },
          {
            href: "https://neovim.io/",
            name: "Neovim",
          },
        ],
        title: "Editor",
      },
      {
        items: [
          {
            href: "https://ghostty.org/",
            name: "Ghostty",
          },
          {
            href: "https://herdr.dev/",
            name: "herdr",
          },
        ],
        title: "Terminal",
      },
      {
        items: [
          {
            href: "https://conductor.build/",
            name: "Conductor",
          },
        ],
        title: "Agent Orchestration",
      },
      {
        items: [
          {
            href: "https://orbstack.dev/",
            name: "OrbStack",
          },
        ],
        title: "Containers",
      },
      {
        items: [
          {
            href: "https://github.com/Schniz/fnm",
            name: "fnm",
          },
        ],
        title: "Package Management",
      },
      {
        items: [
          {
            href: "https://helium.computer/",
            name: "Helium",
          },
        ],
        title: "Browser",
      },
    ],
    title: "Development Software",
  },
];

const UsesPage = () => (
  <div className="flex flex-1 flex-col gap-10 pt-14 pb-12 sm:pt-16">
    <header className="flex flex-col gap-3">
      <h1 className="text-3xl font-medium tracking-tight text-balance">/uses</h1>
      <p className="max-w-[64ch] text-base text-pretty sm:text-sm">
        Hardware connected to my computer and development software I use locally.
      </p>
    </header>

    <div className="flex flex-col gap-10">
      {useGroups.map((group) => (
        <section className="flex flex-col gap-4" key={group.title}>
          <h2 className="text-base font-medium">{group.title}</h2>
          <dl className="border-primary-foreground/10 border-t">
            {group.sections.map((section) => (
              <div
                className="border-primary-foreground/10 grid gap-2 border-b py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
                key={section.title}
              >
                <dt className="font-medium">{section.title}</dt>
                <dd>
                  <ul className="flex flex-col gap-1">
                    {section.items.map((item) => (
                      <li className="text-base sm:text-sm" key={item.href}>
                        <a
                          className="decoration-primary-foreground/30 hover:decoration-primary-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                          href={item.href}
                          rel="noopener noreferrer"
                          target="_blank"
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
);

export default UsesPage;
