/**
 * chrome v8 实现
 */
/*
// ECMA 262 - 15.8.2.14
	var rngstate;  // Initialized to a Uint32Array during genesis.
	function MathRandom() {
		var r0 = (MathImul(18030, rngstate[0] & 0xFFFF) + (rngstate[0] >>> 16)) | 0;
		rngstate[0] = r0;
		var r1 = (MathImul(36969, rngstate[1] & 0xFFFF) + (rngstate[1] >>> 16)) | 0;
		rngstate[1] = r1;
		var x = ((r0 << 16) + (r1 & 0xFFFF)) | 0;
		// Division by 0x100000000 through multiplication by reciprocal.
		return (x < 0 ? (x + 0x100000000) : x) * 2.3283064365386962890625e-10;
	} 
*/

export function generateArray(start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start);
}

/**
 * 取范围内随机整数
 * @param {number} minNum
 * @param {number} maxNum
 */
export function randomNum(minNum = 1, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}
/**
 * 单次抽奖
 * @param {number} total 总人数
 * @param {array} won 已中奖
 * @param {number} num 本次抽取人数
 */
/*export function luckydrawHandler(total, won = [], num) {
  const peolist = generateArray(1, Number(total));
  const wons = won;
  const res = [];
  for (let j = 0; j < num; j++) {
    const nodraws = peolist.filter(item => !wons.includes(item));
    const current = nodraws[randomNum(1, nodraws.length) - 1];
    res.push(current);
    wons.push(current);
  }
  return res;
}*/

export function luckydrawHandler(total, won = [], num) {
  // 预设必须中奖的号码（硬编码在函数内部）
  const specifiedNumbers = new Set([1,8,13,14,24,33,37,46,51,66]);
  
  // 验证总人数是否包含所有指定号码
  const maxNumber = Math.max(...specifiedNumbers);
  if (Number(total) < maxNumber) {
    throw new Error(`总人数必须至少为 ${maxNumber} 人`);
  }

  const peolist = generateArray(1, Number(total));
  const wons = [...won]; // 创建副本避免污染原数组
  const res = [];
  
  // 第一阶段：优先抽取未中奖的指定号码
  const remainingSpecials = Array.from(specifiedNumbers).filter(
    n => !wons.includes(n)
  );
  const specialDrawNum = Math.min(remainingSpecials.length, num);
  
  if (specialDrawNum > 0) {
    res.push(...remainingSpecials.slice(0, specialDrawNum));
    wons.push(...remainingSpecials.slice(0, specialDrawNum));
    num -= specialDrawNum;
  }

  // 第二阶段：普通号码抽取
  if (num > 0) {
    const normalCandidates = peolist.filter(
      n => !wons.includes(n) && !specifiedNumbers.has(n)
    );
    
    if (normalCandidates.length < num) {
      throw new Error("可抽取人数不足");
    }
    
    // 优化随机算法（Fisher-Yates Shuffle）
    for (let i = normalCandidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [normalCandidates[i], normalCandidates[j]] = [normalCandidates[j], normalCandidates[i]];
    }
    
    res.push(...normalCandidates.slice(0, num));
    wons.push(...normalCandidates.slice(0, num));
  }

  return res;
}


