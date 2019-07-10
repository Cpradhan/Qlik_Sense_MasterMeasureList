define( ["qlik", "text!./style.css"],


function (qlik , cssContent) {

  $( "<style>" ).html( cssContent ).appendTo( "head" );
  
  return {
  
  snapshot: {
  canTakeSnapshot: true
  },

  paint: function ($element) {


  //add your rendering code here
  					app = qlik.currApp(this);
					app.createGenericObject({
				    qMeasureListDef : {
                                qType: "measure", qData: { title: "/title", tags: "/tags", expression:"/qMeasure/qDef"}
                                      }
                        }, function(reply){
							                            
							var html = "<table><thead><tr>"
						
									//render titles

									html += '<th>' + 'Title' + '</th>';


									html += '<th>' + 'Description' + '</th>';

									html += '<th>' + 'Definition' + '</th>';

									html += "</tr></thead><tbody>";
									//render data
									$.each(reply.qMeasureList.qItems, function(key, value) {
										console.log( key + ": " + value.qMeasure );
										html += '<tr>'
										var title = "";

										var description = "";

										var definition = "";

										var combined = "";

										title = JSON.stringify(value.qMeta.title);

										title = title.replace(/['"]+/g, '')

										description = JSON.stringify(value.qMeta.description) ;

										description = description.replace(/['"]+/g, '');

										definition = JSON.stringify(value.qData.expression).replace(/\\n|\\r\\n|\\r|\\t/g, '').replace(/"/g, ''); ;

										html += '<td>' + title + '</td>'
										html += '<td>' + description + '</td>'
										html += '<td>' + definition + '</td>'
										html += '</tr>'
										html += '<tr><td/><td/><td/></tr>'
									});

					html += "</tbody></table>";

					$element.html( html );
					
					
				});                                            
	return qlik.Promise.resolve();
  }
  };     


} );

