if (figma.editorType === 'figma') {
  figma.showUI(__html__);

  figma.ui.onmessage =  (msg: {type: string, file_key: string}) => {

    if (msg.type === 'create-shapes') {
      console.log('===========');
      // console.log(msg.file_key);
      const page = figma.currentPage;
      // console.log(page);

      // const nodes = page.findAll();
      // console.log(nodes);

      const nodes2 = page.findAll(node => node.type === 'SECTION');
      console.log(nodes2);

      // https://www.figma.com/file/T08zKxMBiNUcoIOUwD8Nuz/matsuhisa?type=design&node-id=967-4&mode=design&t=up968Zf6ZXPnFrsQ-4
      const file_key = msg.file_key;
      const file_name = figma.root.name;

      const createNodes: SceneNode[] = [];
      nodes2.forEach((node, index) => {
        console.log(node.name);
        const url = `https://www.figma.com/file/${file_key}/${file_name}?node-id=${node.id}`;
        console.log(url);

        (async () => {
          const rect = figma.createText();
          rect.y = index * 150;

          await figma.loadFontAsync({ family: "Inter", style: "Regular" })
          rect.characters = node.name

          rect.fontSize = 18
          rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]

          rect.hyperlink = { type: "URL", value: url }
  
          createNodes.push(rect);
        })();

      });
      figma.currentPage.selection = createNodes;
      figma.viewport.scrollAndZoomIntoView(createNodes);

      // const children = page.children;
      // console.log(children);

      // const nodes: SceneNode[] = [];
      // for (let i = 0; i < msg.count; i++) {
      //   const rect = figma.createRectangle();
      //   rect.x = i * 150;
      //   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      //   figma.currentPage.appendChild(rect);
      //   nodes.push(rect);
      // }
      // figma.currentPage.selection = nodes;
      // figma.viewport.scrollAndZoomIntoView(nodes);
    }

    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin();
  };
}

