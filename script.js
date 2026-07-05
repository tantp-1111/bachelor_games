// 質問データの配列
const questions = [
    {
        text: "君のこともっと知りたいな、と言われたら？",
        choices: ["なんでも聞いてほしい", "少しずつ知っていってほしいな"],
        correct: 2 // 選択肢2が正解
    },
    {
        text: "君と一緒にいるとどきどきするよ、と言われたら？",
        choices: ["どきどきしてるけど、この気持ちがなんなのか確かめたい", "うれしい。わたしもドキドキしてる"],
        correct: 1 // 選択肢1が正解
    },
    {
        text: "会話中にうまく返せないと感じた時の最良の対応は？",
        choices: ["素直に「ちょっと考えたい」と時間をとる", "相手に逆質問して会話を広げる"],
        correct: 2 // 選択肢2が正解
    },
    {
        text: "君ってポジティブだね、と言われたら？",
        choices: ["ありがとう。でも落ち込むこともあるんだよ", "ありがとう。でも意識してる部分もあるんだよ"],
        correct: 2 // 選択肢2が正解
    },
    {
        text: "正直他の女の子も気になっているんだ、と言われたら？",
        choices: ["そっか。でも私の魅力にも気づいてほしいな", "そっか。でも私だけをみてほしいな"],
        correct: 1 // 選択肢1が正解
    }
];

// ゲームの状態を管理する変数
let currentQuestion = 0; // 現在の質問番号
let correctAnswers = 0;  // 正解数をカウント

// ゲーム開始関数
function startQuiz() {
    // 初期化
    currentQuestion = 0;
    correctAnswers = 0;
    const roseDiv = document.getElementById('rose');
    roseDiv.innerHTML = '';
    
    // 画面を切り替え（スタート画面を隠して質問画面を表示）
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('question-screen').classList.remove('hidden');
    
    // 最初の質問を表示
    showQuestion();
}

// 質問を表示する関数
function showQuestion() {
    // 現在の質問データを取得
    const question = questions[currentQuestion];
    
    // HTML要素に質問内容を設定
    document.getElementById('question-title').textContent = `質問 ${currentQuestion + 1}/5`;
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('choice1').textContent = question.choices[0];
    document.getElementById('choice2').textContent = question.choices[1];
}

// 回答選択時の処理
function selectAnswer(choice) {
    // 現在の質問の正解と比較
    if (choice === questions[currentQuestion].correct) {
        correctAnswers++; // 正解なら正解数を増やす
    }
    
    currentQuestion++; // 次の質問に進む
    
    // まだ質問が残っているかチェック
    if (currentQuestion < questions.length) {
        showQuestion(); // 次の質問を表示
    } else {
        showLoading(); // 全問終了ならローディング画面を表示
    }
}

// 結果を表示する関数
function showResult() {
    // 質問画面を隠して結果画面を表示
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    // 結果に表示する画像を定義
    const img = document.createElement('img');
    if (correctAnswers === 5) {
        img.src = 'images/rose_true.png';
        img.alt = 'true_rose';
    } else {
        img.src = 'images/rose_bad.png';
        img.alt = 'bad_rose';
    }
    
    // 正解数に基づいて結果を決定
    if (correctAnswers === 5) {
        // 全問正解の場合
        document.getElementById('result-title').textContent = 'True End 🌹';
        document.getElementById('result-description').textContent =
            'おめでとうございます！真実の愛を手に入れることができました！';
        document.getElementById('rose').appendChild(img);
    } else {
        // 1問でも間違いがある場合
        document.getElementById('result-title').textContent = 'Bad End 🥀';
        document.getElementById('result-description').textContent =
            '残念！真実の愛には届きませんでした';
        document.getElementById('rose').appendChild(img);
    }
}

// 最初に戻る関数
function restartQuiz() {
    // 結果画面を隠してスタート画面を表示
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}

// ローディング画面を表示する関数
function showLoading() {
    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('loading-screen').classList.remove('hidden');
    
    // ローディング時間（2秒）
    setTimeout(() => {
        showResult();
    }, 3000);
}

// Xに投稿する関数
function shareToX() {
    // 結果に応じてツイート内容を決定
    const result = correctAnswers === 5 ? 'True End 🌹' : 'Bad End 🥀';
    const text = `バチェラー式恋愛診断の結果は「${result}」でした！ #バチェ恋診断`;
    
    // X（旧Twitter）の投稿URLを作成
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    
    // 新しいウィンドウで投稿画面を開く
    window.open(twitterUrl, '_blank');
}