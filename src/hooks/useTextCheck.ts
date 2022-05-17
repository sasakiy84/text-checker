import { Rule } from 'domain/ruleGroup/ruleGroup.types';
import { useCallback, useMemo, useState } from 'react';

export type RuleWithGroupName = Rule & { groupName: string };
export type checkResult = RuleWithGroupName & { startAt: number };

/**
 * 与えられたテキストを与えられたルールに則り判定し、結果を返す
 * @param rules Rule[]型を突っ込むと正規表現でチェックする。正規表現のオプションはgum
 * @param text 判定するテキストの初期値。省略可
 * @returns 配列形式で順番に、判定対象テキスト、判定結果、判定対象テキストのsetter
 */
const useTextCheck = ({
  rules,
  text = '',
}: {
  rules: RuleWithGroupName[];
  text?: string;
}): [string, checkResult[], (text: string) => void] => {
  const [targetText, setTargetText] = useState(text);
  const checkText = useCallback(
    (targetText: string): checkResult[] => {
      return rules
        .map((targetRule): checkResult[] => {
          const { incorrect } = targetRule;
          const checkPattern = new RegExp(incorrect, 'gum');
          let matched: RegExpExecArray | null;
          const result: checkResult[] = [];
          while (
            (matched = checkPattern.exec(targetText)) &&
            result[result.length]?.incorrect !== ''
          ) {
            const startAt = matched.index;
            const matchedText = matched[0];
            if (matchedText === '') {
              window.alert(
                '空文字列がマッチしました。無限ループが発生するため、検出処理を中断します。使用中の表記ルールグループに含まれる「*」の使い方を確認してください',
              );
              break;
            }
            result.push({ ...targetRule, startAt, incorrect: matchedText });
          }

          return result;
        })
        .flat()
        .filter((t) => {
          return t.startAt !== -1;
        })
        .sort((a, b) => a.startAt - b.startAt);
    },
    [targetText],
  );

  const checkResults = useMemo(() => checkText(targetText), [targetText]);

  const changeText = useCallback((text: string) => setTargetText(text), []);

  return [targetText, checkResults, changeText];
};
export default useTextCheck;
