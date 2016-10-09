import {Component} from '@angular/core';
import {DataService} from "./services/DataService";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  windowData = null;
  graphData = {
    nodes: [{
      "id": "node_0",
      "label": "ROOT",
      "group": "opera",
      "data": {}
    }, {
      "id": "node_1",
      "label": "StreamingAudio",
      "group": "prm",
      "data": {
        "@id": "_:ub42bL39C22",
        "Organization": "Naxos Digital Services Ltd",
        "bf:InstanceTitle": "MOZART : Marriage of Figaro",
        "bf:Note": [
          {
            "bf:noteType": "Access condition",
            "rdfs:label": "Access restricted to subscribers."
          },
          {
            "bf:noteType": "Mode of Access",
            "rdfs:label": "Mode of Access: World Wide Web browser."
          }
        ],
        "bf:WorkTitle": "Naxos Music Library.",
        "bf:Content": {
          "@id": "http://id.loc.gov/vocabulary/contentTypes/prm",
          "rdfs:label": "performed music"
        },
        "bf:Organization": {
          "@id": "http://id.loc.gov/authorities/names/n78094508",
          "rdfs:label": "Geoffrey Mitchell Choir"
        },
        "bf:Person": [
          {
            "@id": "http://id.loc.gov/rwo/agents/n80022788",
            "@type": "bf:Person",
            "rdfs:label": "Mozart, Wolfgang Amadeus, 1756-1791."
          },
          {
            "@id": "http://id.loc.gov/rwo/agents/n80125207",
            "@type": "bf:Person",
            "rdfs:label": "Beaumarchais, Pierre Augustin Caron de, 1732-1799 "
          },
          {
            "@id": "http://id.loc.gov/rwo/agents/n80057191",
            "@type": "bf:Person",
            "rdfs:label": "Da Ponte, Lorenzo, 1749-1838"
          }
        ],
        "bf:carrier": {
          "@id": "http://id.loc.gov/vocabulary/carriers/cr"
        },
        "bf:extent": "1 online resource (82 streaming audio files)",
        "bf:genreForm": {
          "@id": "_:ub42bL31C15"
        },
        "bf:illustrativeContent": "digital",
        "bf:instanceOf": {
          "@id": "http://bibframe.org/resources/SEj1470609719/990057789670202771"
        },
        "bf:media": {
          "@id": "http://id.loc.gov/vocabulary/mediaTypes/c"
        },
        "bf:provisionActivity": {
          "@id": "_:ub42bL37C26"
        },
        "bf:provisionActivityStatement": "Hong Kong : Naxos Digital Services Ltd., 2007",
        "bf:seriesStatement": "Chandos",
        "bf:soundContent": "Sound on medium"

      }
    }, {
      "id": "node_2",
      "label": "MUSIC",
      "group": "tdm",
      "data": {
        "@id": "_:ub42bL39C22",
        "Organization": "Naxos Digital Services Ltd",
        "bf:InstanceTitle": "(TDM_2) MOZART : Marriage of Figaro",
        "bf:Note": [
          {
            "bf:noteType": "Access condition",
            "rdfs:label": "Access restricted to subscribers."
          },
          {
            "bf:noteType": "Mode of Access",
            "rdfs:label": "Mode of Access: World Wide Web browser."
          }
        ],
        "bf:WorkTitle": "Naxos Music Library.",
        "bf:Person": {
          "@id": "http://id.loc.gov/rwo/agents/n80022788",
          "@type": "bf:Person",
          "rdfs:label": "Mozart, Wolfgang Amadeus, 1756-1791."
        },
        "bf:carrier": {
          "@id": "http://id.loc.gov/vocabulary/carriers/cr"
        },
        "bf:extent": "1 online resource (82 streaming audio files)",
        "bf:genreForm": {
          "@id": "_:ub42bL31C15"
        },
        "bf:illustrativeContent": "digital",
        "bf:instanceOf": {
          "@id": "http://bibframe.org/resources/SEj1470609719/990057789670202771"
        },
        "bf:media": {
          "@id": "http://id.loc.gov/vocabulary/mediaTypes/c"
        },
        "bf:provisionActivity": {
          "@id": "_:ub42bL37C26"
        },
        "bf:provisionActivityStatement": "Hong Kong : Naxos Digital Services Ltd., 2007",
        "bf:seriesStatement": "Chandos",
        "bf:soundContent": "Sound on medium"

      }
    }, {
      "id": "node_3",
      "label": "MUSIC",
      "group": "prm",
      "data": {
        "@id": "_:ub42bL39C22",
        "Organization": "Naxos Digital Services Ltd",
        "bf:InstanceTitle": "(PRM_3) MOZART : Marriage of Figaro",
        "bf:Note": [
          {
            "bf:noteType": "Access condition",
            "rdfs:label": "Access restricted to subscribers."
          },
          {
            "bf:noteType": "Mode of Access",
            "rdfs:label": "Mode of Access: World Wide Web browser."
          }
        ],
        "bf:WorkTitle": "Naxos Music Library.",
        "bf:Person": {
          "@id": "http://id.loc.gov/rwo/agents/n80022788",
          "@type": "bf:Person",
          "rdfs:label": "Mozart, Wolfgang Amadeus, 1756-1791."
        },
        "bf:carrier": {
          "@id": "http://id.loc.gov/vocabulary/carriers/cr"
        },
        "bf:extent": "1 online resource (82 streaming audio files)",
        "bf:genreForm": {
          "@id": "_:ub42bL31C15"
        },
        "bf:illustrativeContent": "digital",
        "bf:instanceOf": {
          "@id": "http://bibframe.org/resources/SEj1470609719/990057789670202771"
        },
        "bf:media": {
          "@id": "http://id.loc.gov/vocabulary/mediaTypes/c"
        },
        "bf:provisionActivity": {
          "@id": "_:ub42bL37C26"
        },
        "bf:provisionActivityStatement": "Hong Kong : Naxos Digital Services Ltd., 2007",
        "bf:seriesStatement": "Chandos",
        "bf:soundContent": "Sound on medium"

      }
    }, {
      "id": "node_4",
      "label": "MUSIC",
      "group": "ntm",
      "data": {
        "@id": "_:ub42bL39C22",
        "Organization": "Naxos Digital Services Ltd",
        "bf:InstanceTitle": "(NTM_4) MOZART : Marriage of Figaro",
        "bf:Note": [
          {
            "bf:noteType": "Access condition",
            "rdfs:label": "Access restricted to subscribers."
          },
          {
            "bf:noteType": "Mode of Access",
            "rdfs:label": "Mode of Access: World Wide Web browser."
          }
        ],
        "bf:WorkTitle": "Naxos Music Library.",
        "bf:Person": {
          "@id": "http://id.loc.gov/rwo/agents/n80022788",
          "@type": "bf:Person",
          "rdfs:label": "Mozart, Wolfgang Amadeus, 1756-1791."
        },
        "bf:carrier": {
          "@id": "http://id.loc.gov/vocabulary/carriers/cr"
        },
        "bf:extent": "1 online resource (82 streaming audio files)",
        "bf:genreForm": {
          "@id": "_:ub42bL31C15"
        },
        "bf:illustrativeContent": "digital",
        "bf:instanceOf": {
          "@id": "http://bibframe.org/resources/SEj1470609719/990057789670202771"
        },
        "bf:media": {
          "@id": "http://id.loc.gov/vocabulary/mediaTypes/c"
        },
        "bf:provisionActivity": {
          "@id": "_:ub42bL37C26"
        },
        "bf:provisionActivityStatement": "Hong Kong : Naxos Digital Services Ltd., 2007",
        "bf:seriesStatement": "Chandos",
        "bf:soundContent": "Sound on medium"

      }
    }, {
      "id": "node_5",
      "label": "MUSIC",
      "group": "txt",
      "data": {
        "@id": "_:ub42bL39C22",
        "Organization": "Naxos Digital Services Ltd",
        "bf:InstanceTitle": "(TXT_5) MOZART : Marriage of Figaro",
        "bf:Note": [
          {
            "bf:noteType": "Access condition",
            "rdfs:label": "Access restricted to subscribers."
          },
          {
            "bf:noteType": "Mode of Access",
            "rdfs:label": "Mode of Access: World Wide Web browser."
          }
        ],
        "bf:WorkTitle": "Naxos Music Library.",
        "bf:Person": {
          "@id": "http://id.loc.gov/rwo/agents/n80022788",
          "@type": "bf:Person",
          "rdfs:label": "Mozart, Wolfgang Amadeus, 1756-1791."
        },
        "bf:carrier": {
          "@id": "http://id.loc.gov/vocabulary/carriers/cr"
        },
        "bf:extent": "1 online resource (82 streaming audio files)",
        "bf:genreForm": {
          "@id": "_:ub42bL31C15"
        },
        "bf:illustrativeContent": "digital",
        "bf:instanceOf": {
          "@id": "http://bibframe.org/resources/SEj1470609719/990057789670202771"
        },
        "bf:media": {
          "@id": "http://id.loc.gov/vocabulary/mediaTypes/c"
        },
        "bf:provisionActivity": {
          "@id": "_:ub42bL37C26"
        },
        "bf:provisionActivityStatement": "Hong Kong : Naxos Digital Services Ltd., 2007",
        "bf:seriesStatement": "Chandos",
        "bf:soundContent": "Sound on medium"

      }
    }, {
      "id": "node_6",
      "label": "MUSIC",
      "group": "prm",
      "data": {
        "@id": "_:ub42bL39C22",
        "Organization": "Naxos Digital Services Ltd",
        "bf:InstanceTitle": "(PRM_6) MOZART : Marriage of Figaro",
        "bf:Note": [
          {
            "bf:noteType": "Access condition",
            "rdfs:label": "Access restricted to subscribers."
          },
          {
            "bf:noteType": "Mode of Access",
            "rdfs:label": "Mode of Access: World Wide Web browser."
          }
        ],
        "bf:WorkTitle": "Naxos Music Library.",
        "bf:Person": {
          "@id": "http://id.loc.gov/rwo/agents/n80022788",
          "@type": "bf:Person",
          "rdfs:label": "Mozart, Wolfgang Amadeus, 1756-1791."
        },
        "bf:carrier": {
          "@id": "http://id.loc.gov/vocabulary/carriers/cr"
        },
        "bf:extent": "1 online resource (82 streaming audio files)",
        "bf:genreForm": {
          "@id": "_:ub42bL31C15"
        },
        "bf:illustrativeContent": "digital",
        "bf:instanceOf": {
          "@id": "http://bibframe.org/resources/SEj1470609719/990057789670202771"
        },
        "bf:media": {
          "@id": "http://id.loc.gov/vocabulary/mediaTypes/c"
        },
        "bf:provisionActivity": {
          "@id": "_:ub42bL37C26"
        },
        "bf:provisionActivityStatement": "Hong Kong : Naxos Digital Services Ltd., 2007",
        "bf:seriesStatement": "Chandos",
        "bf:soundContent": "Sound on medium"

      }
    }],
    edges: [{
      "id": "edge_0",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_1",
      "data": {}
    }, {
      "id": "edge_1",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_2",
      "data": {}
    }, {
      "id": "edge_2",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_3",
      "data": {}
    }, {
      "id": "edge_3",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_4",
      "data": {}
    }, {
      "id": "edge_4",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_5",
      "data": {}
    }, {
      "id": "edge_5",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_6",
      "data": {}
    }]
  };

  onNodeClicked(ev) {
    this.windowData = ev;
  }

}
