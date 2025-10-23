create table indexer.collections (
	contract_id text not null,
	name text,
	url text,
	primary key (contract_id)
);
insert into indexer.collections (contract_id, name, url) values ('0x45c964371490bdfc2610ca116853d22a9b6e0de1abb67f61b81ab9d291b0015c', 'Fuel Pumps', 'https://ipfs.io/ipfs/QmXyd5j7dDaYDuXZZ62uqh5CsrG9nUXNy7eQmedxEEwU25/{subId}.json');
insert into indexer.collections (contract_id, name, url) values ('0x3f3f87bb15c693784e90521c64bac855ce23d971356a6ccd57aa92e02e696432', 'Executoors', 'https://ipfs.io/ipfs/bafybeif44cbambuyvtfhk6lbaozshy4xs3p4saeqnizxlon4age6pkr2ua/{subId}.json');
insert into indexer.collections (contract_id, name, url) values ('0x0d34ec513cbaf7e15737120725cd3e235a8fd1716fa0eedc5da4a64c182e5a9f', 'FuelMonkees', 'https://gateway.lighthouse.storage/ipfs/bafybeidfwggiv7mjxbrrtpozsdhknl3hyhwyzmzesqiulvflpehhxdsjii/Monkee%20{subId}.json');
insert into indexer.collections (contract_id, name, url) values ('0xaa919d413a57cb6c577b2e172480cbe2f88df0e28203fed52249cabca6cee74a', 'Fuel Pengus', 'https://ipfs.io/ipfs/QmNZqtRxyyuh1nbXUapSgCmGTW2GofXERZzkLBmwVxjmES/{subId}.json');
insert into indexer.collections (contract_id, name, url) values ('0x65aa85875bf92fb5b487ade154f88507d74b233ef901b4a172f4616b527a4784', 'Fuel Dudes', 'https://ipfs.io/ipfs/QmYvaFhBXHXDiccmZnh17gPCT8R62EyY1KWyLz7Zz6dJd4/{subId}.json');
insert into indexer.collections (contract_id, name, url) values ('0x4365ec565b25febe517770709edb54f081fc67fbb4f561ac53b2b608371079db', 'Fuel Rocks', 'https://ipfs.io/ipfs/bafybeie5loshrrqky4boemlnxc5fzsoc4c7cs6gqgbwvt6r7h56nre7oj4/{subId}.json');
insert into indexer.collections (contract_id, name, url) values ('0xb03ec5c6eeaf6d09ed6755e21dff896234c8f509b813f3ff17ef14a436fa8462', 'Sangoro', 'https://ipfs.io/ipfs/QmQJjbRChfHyaYPutY2ZBuJqByfseVNG5bwz7gSuQeYESU/{subId}.json');
insert into indexer.collections (contract_id, name, url) values ('0x59b10bd361740618f12bba00f1083ef304a294b37ed7a8756c1b9cfc9b491b16', 'Fuel BomBa', 'https://ipfs.io/ipfs/QmSY7YZGZtY6nWsAm7Wr9bgA36ZahPxYiYBA241m3BFyyS/{subId}.json');
insert into indexer.collections (contract_id, name, url) values ('0x0c10a1c5ef62b346a27a16cc4c270f5e74c1c94a7f8233fcf0223716b6c9f326', 'Griffy Amplify', 'https://api.thundernft.market/v1/metadata/griffy/{subId}');
insert into indexer.collections (contract_id, name, url) values ('0xf0b6e2320caccb9071e45b1150b4da6f5edf74e7375ac6c87084822a87832de2', 'BearBros', 'https://ipfs.io/ipfs/bafybeihaphqpylne3ft7dlfh4qlisscgn7osd7d7avhgvcpfiskia6fx5i/{subId}.json');
update indexer.migration set version = 7;
