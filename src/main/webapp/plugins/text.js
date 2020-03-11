/**
 * Text extraction plugin.
 */
Draw.loadPlugin(function(ui)
{
	// Adds resource for action
	mxResources.parse('extractText=Extract Text...');

	
	
	
	
	// Adds action
	ui.actions.addAction('extractText', function()
	{
		var tmp = document.createElement('div');
		var labels = [];
		var label = '';
		for (var key in this.model.cells)
		{
			var cell = this.model.cells[key];

			if (this.model.isVertex(cell) || this.model.isEdge(cell))
			{
				if (this.isHtmlLabel(cell))
				{
					tmp.innerHTML = this.getLabel(cell);
					label = mxUtils.extractTextWithWhitespace([tmp]);
				}
				else
				{					
					label = this.getLabel(cell);
				}

				label = mxUtils.trim(label.replace(/[\x00-\x1F\x7F-\x9F]|\s+/g, ' '));

				if (label.length > 0)
				{
					labels.push(label);
				}
			}
		}
	
// 		var dlg = new EmbedDialog(ui, ui.editor.graph.getIndexableText(),
// 			null, null, null, 'Extracted Text:');
		var dlg = new EmbedDialog(ui, labels.join(','),
			null, null, null, 'Extracted Text:');
		ui.showDialog(dlg.container, 440, 240, true, true);
		dlg.init();
	});
	
	var menu = ui.menus.get('extras');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		ui.menus.addMenuItems(menu, ['-', 'extractText'], parent);
	};
});
