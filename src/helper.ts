export let parseHelper = {
  //just for vite-plugin-template-parser plugin
  node({ node: n, parent, i }: any) {
    let attr = n.attrsMap.anime;
    let key = n.attrsMap["v-if"]; //||n.attrsMap["v-else"]||n.attrsMap["v-else-if"]
    if (attr && !n.attrsMap["v-for"] && key) {
      parent.children.splice(i, 1, {
        type: 1,
        tag: "transition",
        attrsMap: {
          ":css": "false",
          "@before-enter": "$enterBefore",
          "@enter": "$enter",
          "@leave": "$leave",
          "@after-leave": "$leaveAfter",
          "@enter-cancelled": "$enterCancel",
        },
        attrslist: [
          { name: ":css", value: "false" },
          { name: "@before-enter", value: "$enterBefore" },
          { name: "@enter", value: "$enter" },
          { name: "@leave", value: "$leave" },
          { name: "@after-leave", value: "$leaveAfter" },
          { name: "@enter-cancelled", value: "$enterCancel" },
        ],
        children: parent.children.filter((i: any) => {
          return i.attrsMap.anime === attr;
        }),
      });

      parent.children = parent.children.filter((i: any) => {
        return i.attrsMap.anime !== attr;
      });
      return;
    }
    if (attr && n.attrsMap["v-for"]) {
      parent.children.splice(i, 1, {
        type: 1,
        tag: "transition-group",
        attrsMap: {
          ":css": "false",
          "@before-enter": "$enterBefore",
          "@enter": "$enter",
          "@leave": "$leave",
          "@after-leave": "$leaveAfter",
          "@enter-cancelled": "$enterCancel",
        },
        attrslist: [
          { name: ":css", value: "false" },
          { name: "@before-enter", value: "$enterBefore" },
          { name: "@enter", value: "$enter" },
          { name: "@leave", value: "$leave" },
          { name: "@after-leave", value: "$leaveAfter" },
          { name: "@enter-cancelled", value: "$enterCancel" },
        ],
        children: parent.children.filter((i: any) => {
          return i.attrsMap.anime === attr;
        }),
      });

      parent.children = parent.children.filter((i: any) => {
        return i.attrsMap.anime !== attr;
      });
      return
    }
  },
};
