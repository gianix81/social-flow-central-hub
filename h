[33mcommit 83b7cdd2abfb58576552a9204d33037d4192f6cd[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmaster[m[33m, [m[1;31morigin/master[m[33m)[m
Author: Giovanni De Rosa <cragenziadigitale@gmail.com>
Date:   Sat May 17 10:03:18 2025 +0200

    Recupero progetto cancellato

 .gitignore                                         |   24 [32m+[m
 README.md                                          |   73 [32m+[m
 android/.gitignore                                 |  101 [32m+[m
 android/app/.gitignore                             |    2 [32m+[m
 android/app/build.gradle                           |   54 [32m+[m
 android/app/capacitor.build.gradle                 |   19 [32m+[m
 android/app/proguard-rules.pro                     |   21 [32m+[m
 .../myapp/ExampleInstrumentedTest.java             |   26 [32m+[m
 android/app/src/main/AndroidManifest.xml           |   41 [32m+[m
 .../src/main/java/com/smm/app/MainActivity.java    |    5 [32m+[m
 .../app/src/main/res/drawable-land-hdpi/splash.png |  Bin [31m0[m -> [32m7705[m bytes
 .../app/src/main/res/drawable-land-mdpi/splash.png |  Bin [31m0[m -> [32m4040[m bytes
 .../src/main/res/drawable-land-xhdpi/splash.png    |  Bin [31m0[m -> [32m9251[m bytes
 .../src/main/res/drawable-land-xxhdpi/splash.png   |  Bin [31m0[m -> [32m13984[m bytes
 .../src/main/res/drawable-land-xxxhdpi/splash.png  |  Bin [31m0[m -> [32m17683[m bytes
 .../app/src/main/res/drawable-port-hdpi/splash.png |  Bin [31m0[m -> [32m7934[m bytes
 .../app/src/main/res/drawable-port-mdpi/splash.png |  Bin [31m0[m -> [32m4096[m bytes
 .../src/main/res/drawable-port-xhdpi/splash.png    |  Bin [31m0[m -> [32m9875[m bytes
 .../src/main/res/drawable-port-xxhdpi/splash.png   |  Bin [31m0[m -> [32m13346[m bytes
 .../src/main/res/drawable-port-xxxhdpi/splash.png  |  Bin [31m0[m -> [32m17489[m bytes
 .../res/drawable-v24/ic_launcher_foreground.xml    |   34 [32m+[m
 .../main/res/drawable/ic_launcher_background.xml   |  170 [32m+[m
 android/app/src/main/res/drawable/splash.png       |  Bin [31m0[m -> [32m4040[m bytes
 android/app/src/main/res/layout/activity_main.xml  |   12 [32m+[m
 .../src/main/res/mipmap-anydpi-v26/ic_launcher.xml |    5 [32m+[m
 .../res/mipmap-anydpi-v26/ic_launcher_round.xml    |    5 [32m+[m
 .../app/src/main/res/mipmap-hdpi/ic_launcher.png   |  Bin [31m0[m -> [32m2786[m bytes
 .../res/mipmap-hdpi/ic_launcher_foreground.png     |  Bin [31m0[m -> [32m3450[m bytes
 .../src/main/res/mipmap-hdpi/ic_launcher_round.png |  Bin [31m0[m -> [32m4341[m bytes
 .../app/src/main/res/mipmap-mdpi/ic_launcher.png   |  Bin [31m0[m -> [32m1869[m bytes
 .../res/mipmap-mdpi/ic_launcher_foreground.png     |  Bin [31m0[m -> [32m2110[m bytes
 .../src/main/res/mipmap-mdpi/ic_launcher_round.png |  Bin [31m0[m -> [32m2725[m bytes
 .../app/src/main/res/mipmap-xhdpi/ic_launcher.png  |  Bin [31m0[m -> [32m3981[m bytes
 .../res/mipmap-xhdpi/ic_launcher_foreground.png    |  Bin [31m0[m -> [32m5036[m bytes
 .../main/res/mipmap-xhdpi/ic_launcher_round.png    |  Bin [31m0[m -> [32m6593[m bytes
 .../app/src/main/res/mipmap-xxhdpi/ic_launcher.png |  Bin [31m0[m -> [32m6644[m bytes
 .../res/mipmap-xxhdpi/ic_launcher_foreground.png   |  Bin [31m0[m -> [32m9793[m bytes
 .../main/res/mipmap-xxhdpi/ic_launcher_round.png   |  Bin [31m0[m -> [32m10455[m bytes
 .../src/main/res/mipmap-xxxhdpi/ic_launcher.png    |  Bin [31m0[m -> [32m9441[m bytes
 .../res/mipmap-xxxhdpi/ic_launcher_foreground.png  |  Bin [31m0[m -> [32m15529[m bytes
 .../main/res/mipmap-xxxhdpi/ic_launcher_round.png  |  Bin [31m0[m -> [32m15916[m bytes
 .../src/main/res/values/ic_launcher_background.xml |    4 [32m+[m
 android/app/src/main/res/values/strings.xml        |    7 [32m+[m
 android/app/src/main/res/values/styles.xml         |   22 [32m+[m
 android/app/src/main/res/xml/file_paths.xml        |    5 [32m+[m
 .../com/getcapacitor/myapp/ExampleUnitTest.java    |   18 [32m+[m
 android/build.gradle                               |   29 [32m+[m
 android/capacitor.settings.gradle                  |    3 [32m+[m
 android/gradle.properties                          |   22 [32m+[m
 android/gradle/wrapper/gradle-wrapper.jar          |  Bin [31m0[m -> [32m43583[m bytes
 android/gradle/wrapper/gradle-wrapper.properties   |    7 [32m+[m
 android/gradlew                                    |  252 [32m+[m
 android/gradlew.bat                                |   94 [32m+[m
 android/settings.gradle                            |    5 [32m+[m
 android/variables.gradle                           |   16 [32m+[m
 bun.lockb                                          |  Bin [31m0[m -> [32m198351[m bytes
 capacitor.config.ts                                |    9 [32m+[m
 components.json                                    |   20 [32m+[m
 eslint.config.js                                   |   29 [32m+[m
 index.html                                         |   27 [32m+[m
 package-lock.json                                  | 8145 [32m++++++++++++++++++++[m
 package.json                                       |   87 [32m+[m
 postcss.config.js                                  |    6 [32m+[m
 public/favicon.ico                                 |  Bin [31m0[m -> [32m1150[m bytes
 public/placeholder.svg                             |    1 [32m+[m
 public/robots.txt                                  |   14 [32m+[m
 src/App.css                                        |   42 [32m+[m
 src/App.tsx                                        |   56 [32m+[m
 src/components/AppSidebar.tsx                      |  218 [32m+[m
 src/components/BarraSuperiore.tsx                  |   71 [32m+[m
 src/components/Layout.tsx                          |   40 [32m+[m
 src/components/NotificheDropdown.tsx               |   22 [32m+[m
 src/components/SvegliPromemoria.tsx                |  263 [32m+[m
 src/components/TopNav.tsx                          |   65 [32m+[m
 src/components/calendario/EventoCalendario.tsx     |   62 [32m+[m
 src/components/calendario/FormEvento.tsx           |  299 [32m+[m
 src/components/clienti/FormCliente.tsx             |  185 [32m+[m
 src/components/collaboratori/FormCollaboratore.tsx |  200 [32m+[m
 src/components/progetti/FormProgetto.tsx           |  231 [32m+[m
 src/components/team/FormOperatore.tsx              |  120 [32m+[m
 src/components/ui/accordion.tsx                    |   56 [32m+[m
 src/components/ui/alert-dialog.tsx                 |  139 [32m+[m
 src/components/ui/alert.tsx                        |   59 [32m+[m
 src/components/ui/aspect-ratio.tsx                 |    5 [32m+[m
 src/components/ui/avatar.tsx                       |   48 [32m+[m
 src/components/ui/badge.tsx                        |   36 [32m+[m
 src/components/ui/breadcrumb.tsx                   |  115 [32m+[m
 src/components/ui/button.tsx                       |   56 [32m+[m
 src/components/ui/calendar.tsx                     |   64 [32m+[m
 src/components/ui/card.tsx                         |   79 [32m+[m
 src/components/ui/carousel.tsx                     |  260 [32m+[m
 src/components/ui/chart.tsx                        |  363 [32m+[m
 src/components/ui/checkbox.tsx                     |   28 [32m+[m
 src/components/ui/collapsible.tsx                  |    9 [32m+[m
 src/components/ui/command.tsx                      |  153 [32m+[m
 src/components/ui/context-menu.tsx                 |  198 [32m+[m
 src/components/ui/dialog.tsx                       |  120 [32m+[m
 src/components/ui/drawer.tsx                       |  116 [32m+[m
 src/components/ui/dropdown-menu.tsx                |  198 [32m+[m
 src/components/ui/form.tsx                         |  176 [32m+[m
 src/components/ui/hover-card.tsx                   |   27 [32m+[m
 src/components/ui/input-otp.tsx                    |   69 [32m+[m
 src/components/ui/input.tsx                        |   22 [32m+[m
 src/components/ui/label.tsx                        |   24 [32m+[m
 src/components/ui/menubar.tsx                      |  234 [32m+[m
 src/components/ui/navigation-menu.tsx              |  128 [32m+[m
 src/components/ui/pagination.tsx                   |  117 [32m+[m
 src/components/ui/popover.tsx                      |   29 [32m+[m
 src/components/ui/progress.tsx                     |   26 [32m+[m
 src/components/ui/radio-group.tsx                  |   42 [32m+[m
 src/components/ui/resizable.tsx                    |   43 [32m+[m
 src/components/ui/scroll-area.tsx                  |   46 [32m+[m
 src/components/ui/select.tsx                       |  158 [32m+[m
 src/components/ui/separator.tsx                    |   29 [32m+[m
 src/components/ui/sheet.tsx                        |  131 [32m+[m
 src/components/ui/sidebar.tsx                      |  761 [32m++[m
 src/components/ui/skeleton.tsx                     |   15 [32m+[m
 src/components/ui/slider.tsx                       |   26 [32m+[m
 src/components/ui/sonner.tsx                       |   29 [32m+[m
 src/components/ui/switch.tsx                       |   27 [32m+[m
 src/components/ui/table.tsx                        |  117 [32m+[m
 src/components/ui/tabs.tsx                         |   53 [32m+[m
 src/components/ui/textarea.tsx                     |   24 [32m+[m
 src/components/ui/toast.tsx                        |  127 [32m+[m
 src/components/ui/toaster.tsx                      |   33 [32m+[m
 src/components/ui/toggle-group.tsx                 |   59 [32m+[m
 src/components/ui/toggle.tsx                       |   43 [32m+[m
 src/components/ui/tooltip.tsx                      |   28 [32m+[m
 src/components/ui/use-toast.ts                     |    3 [32m+[m
 src/hooks/use-mobile.tsx                           |   23 [32m+[m
 src/hooks/use-toast.ts                             |  191 [32m+[m
 src/hooks/useCalendario.tsx                        |  183 [32m+[m
 src/hooks/useClienti.tsx                           |  128 [32m+[m
 src/hooks/useCollaboratori.tsx                     |   88 [32m+[m
 src/hooks/useOperatori.tsx                         |  108 [32m+[m
 src/hooks/useProgetti.tsx                          |  147 [32m+[m
 src/index.css                                      |  101 [32m+[m
 src/lib/utils.ts                                   |    6 [32m+[m
 src/main.tsx                                       |    5 [32m+[m
 src/pages/BancaIdee.tsx                            |  315 [32m+[m
 src/pages/Calendar.tsx                             |  145 [32m+[m
 src/pages/Calendario.tsx                           |  266 [32m+[m
 src/pages/ClientDetail.tsx                         |  347 [32m+[m
 src/pages/Clienti.tsx                              |  456 [32m++[m
 src/pages/Clients.tsx                              |   94 [32m+[m
 src/pages/Collaboratori.tsx                        |  166 [32m+[m
 src/pages/ContentHub.tsx                           |  292 [32m+[m
 src/pages/Dashboard.tsx                            |  203 [32m+[m
 src/pages/DettaglioCliente.tsx                     |  458 [32m++[m
 src/pages/DettaglioProgetto.tsx                    |  189 [32m+[m
 src/pages/EmailViewer.tsx                          |  430 [32m++[m
 src/pages/HubContenuti.tsx                         |   21 [32m+[m
 src/pages/IdeaBank.tsx                             |  180 [32m+[m
 src/pages/Impostazioni.tsx                         |  261 [32m+[m
 src/pages/Index.tsx                                |   14 [32m+[m
 src/pages/NotFound.tsx                             |   25 [32m+[m
 src/pages/OsservatorioWeb.tsx                      |  334 [32m+[m
 src/pages/Progetti.tsx                             |  502 [32m++[m
 src/pages/ProjectDetail.tsx                        |  189 [32m+[m
 src/pages/Projects.tsx                             |  281 [32m+[m
 src/pages/Team.tsx                                 |  266 [32m+[m
 src/pages/WebWatch.tsx                             |  326 [32m+[m
 src/vite-env.d.ts                                  |    1 [32m+[m
 tailwind.config.ts                                 |  120 [32m+[m
 tsconfig.app.json                                  |   30 [32m+[m
 tsconfig.json                                      |   19 [32m+[m
 tsconfig.node.json                                 |   22 [32m+[m
 vite.config.ts                                     |   22 [32m+[m
 168 files changed, 22990 insertions(+)
