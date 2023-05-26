// use serde::Deserialize;
// use serde_json::Value;

// #[derive(Deserialize)]
// struct Blocks {
//     blocks: Vec<Block>
// }

// #[derive(Deserialize)]
// struct Block {
//     id: [u8; 32],
//     height: u64,
//     producer: [u8; 32],
//     timestamp: u64,
//     hash: [u8; 32],
// }

#[test]
fn block() {
    // let client = reqwest::Client::new();
    // let response = client.post("http://127.0.0.1:29987/api/playground/indexer/indexer")
    //     .header(reqwest::header::CONTENT_TYPE, "application/graphql".to_owned())
    //     .body(r#"{ "query": "query { block { id height producer hash timestamp }}" }"#)
    //     .send()
    //     .await
    //     .unwrap();

    // let body = response.text().await.unwrap();
    // let result: Blocks = serde_json::from_str(&body).unwrap();
    // let result: Value = serde_json::from_str(&body).unwrap();
    // let block = result.get(0);

    // let expected = Block {
    //     id: [0; 32],
    //     height: 0,
    //     producer: [0; 32],
    //     timestamp: 0,
    //     hash: [0; 32],
    // };
    // assert_eq!(expected, block);
    // dbg!(result);

    assert!(false);
}
