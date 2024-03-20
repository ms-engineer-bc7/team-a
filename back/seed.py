from app import db
from models import PositiveTable, EncourageTable, EmotionTable

# EmotionTableのデータ追加
emotions = [
    EmotionTable(id=1, emotion='しょんぼり', value=-0.3),
    EmotionTable(id=2, emotion='悲しい', value=-0.6),
    EmotionTable(id=3, emotion='絶望', value=-0.9)
]

# PositiveTableのデータ追加
positives = [
    PositiveTable(
        id=1,
        quote='20歳の顔は自然の贈り物。50歳の顔はあなたの功績。女は40を過ぎて初めて面白くなる。かけがえのない人間になるためには、いつも他と違っていなければならない。',
        author='ココ・シャネル（デザイナー）',
        comment='ファッションブランド「シャネル」の創始者。孤児院や修道院で育つ。歌手を志していたが目が出ず、趣味として制作していた帽子が評判となったのをきっかけに帽子専門店を開店。今日の「シャネル」へと繋がった。',
        emotion_id=2
    ),
    PositiveTable(
        id=2,
        quote='やさしい言葉は、たとえ簡単な言葉でもずっとずっと心にこだまする。',
        author='マザーテレサ（修道女）',
        comment='カトリックの家庭に生まれ、幼少期からインドで修道女として働くことを夢見る。18歳で修道女となりインドのカルカッタに赴任その後、地理教師、校長を務め修道会「神の愛の宣教者会」を設立。「死を待つ人々の家」を開設し、貧しき人々のために一生を捧げた',
        emotion_id=3
    ),
    PositiveTable(
        id=3,
        quote='人生で最高のもの、最も美しいものは、目に見えず触れることもできません。それは心で感じるものなのです。',
        author='ヘレン・ケラー（教育者・社会福祉事業化）',
        comment='幼いころの高熱が原因で、視力・聴力・話す能力を失う。家庭教師のサリバン先生が現れるまではまともなしつけも受けられず、我儘に育つも、サリバン先生の指導により猛勉強の結果、三重苦を乗り越えハーバード大学を卒業した。その後、社会活動家となり世界を舞台に福祉活動、女性や被差別者、労働者の地位向上に尽くした。',
        emotion_id=1
    ),
    PositiveTable(
        id=4,
        quote='あなたが生まれた時、周りの人は笑ってあなたは泣いていた。だからあなたが死ぬときは、あなたが笑って、周りの人が泣くような人生を生きなさい。',
        author='ネイティブアメリカンの教え',
        comment='アメリカ大陸の先住民族である「アメリカ・インディアン」の呼称。インディアンのみならずアメリカ合衆国内の先住民すべてを指すことが多い。「アメリカ・インディアン」の呼称について、差別を助長するという理由からネイティブ・アメリカンと呼び替える動きが進んでいるが、名称を替えること自体が差別的であるとする見解もある。',
        emotion_id=2
    ),
]

# EncourageTableのデータ追加
encouragements = [
    EncourageTable(
        id=1,
        quote='人生とは、嵐が過ぎ去るのを待つことではない。嵐の中で、どんな風にダンスをするかを学ぶことだ。',
        author='ヴィヴィアン・グリーン(歌手)',
        comment='８歳でピアノを始め、１１歳では歌を書いていた。１８歳でバックシンガーとして活動し。2002年にレコード契約。ジャジーなノリのR&Bが特徴。通算6枚のアルバムを発表し、代表曲「Emotional Rollercoaster」がある。',
        emotion_id=1
    ),
    EncourageTable(
        id=2,
        quote='目の前にある現実だけを見て、幸福だとか不幸だとかを判断してはいけない。その時は不幸だと思っていたことが、後で考えてみると、より大きな幸福のために必要だったと言うことがよくあるの。',
        author='フジコ・ヘミング（ピアニスト）',
        comment='遅咲きのピアニスト。将来を嘱望されながらもチャンスに恵まれず、時には病院で清掃や介護の仕事をしながら再起を目指し、60代後半にしてやっとピアニストとしての成功を手に入れました。',
        emotion_id=2
    ),
]

# Emotion_tableのデータ追加
emotions = [
   EmotionTable(
       id=1,
       emotion='しょんぼり',
       value='-0.3'
   ),
   EmotionTable(
       id=2,
       emotion='悲しい',
       value='-0.6'   
   ),
   EmotionTable(
       id=3,
       emotion='絶望',
       value='-0.9'   
   ),
]

# データベースセッションに追加してコミット
with db.session.begin():
    # 既存のデータを削除
    db.session.query(PositiveTable).delete()
    db.session.query(EncourageTable).delete()
    db.session.query(EmotionTable).delete()

    # 新しいデータを追加
    db.session.add_all(emotions + positives + encouragements)

# 確認のためのプリントステートメント
print('シーディング完了！')
