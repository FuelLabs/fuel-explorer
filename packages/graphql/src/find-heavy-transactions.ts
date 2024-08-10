// @ts-nocheck
// import { BlockRepository } from './domain/Block/BlockRepository';
// import { setTimeout } from 'node:timers/promises';
// import { OperationsFactory } from './domain/Operation/factories/OperationsFactory';
// import pgp from 'pg-promise';

// function formatBytes(bytes, decimals = 2) {
//   if (!+bytes) return '0 Bytes';

//   const k = 1024;
//   const dm = decimals < 0 ? 0 : decimals;
//   const sizes = [
//     'Bytes',
//     'KiB',
//     'MiB',
//     'GiB',
//     'TiB',
//     'PiB',
//     'EiB',
//     'ZiB',
//     'YiB',
//   ];

//   const i = Math.floor(Math.log(bytes) / Math.log(k));

//   return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
// }

// async function main() {
//   let start = parseInt(process.argv[2]);
//   const size = 200;
//   const connection = await pgp()(
//     'postgres://postgres:postgres@localhost:5435/postgres',
//   );
//   while (true) {
//     console.log(start);
//     const res = await BlockRepository.blocksFromNode(size, start);
//     const { blocks } = res;
//     for (const block of blocks) {
//       for (const transaction of block.transactions) {
//         const output = OperationsFactory.create(transaction).value();
//         if (
//           transaction.status?.receipts &&
//           transaction.status?.receipts.length > 0
//         ) {
//           try {
//             const data = JSON.stringify(output);
//             await connection.query(
//               'insert into transaction_log (block_height, transaction_id, receipts_length, receipts_size) values ($1, $2, $3, $4)',
//               [
//                 block.height,
//                 transaction.id,
//                 transaction.status?.receipts?.length,
//                 data.length,
//               ],
//             );
//           } catch (e: any) {
//             console.log(transaction.id, transaction.status?.receipts.length);
//             console.log(e.message);
//             await connection.query(
//               'insert into transaction_log (block_height, transaction_id, receipts_length, receipts_size, error) values ($1, $2, $3, $4, $5)',
//               [
//                 block.height,
//                 transaction.id,
//                 transaction.status?.receipts?.length,
//                 0,
//                 e.message,
//               ],
//             );
//           }
//         }
//       }
//     }
//     start += size;
//     await setTimeout(100);
//   }
// }

// main();
