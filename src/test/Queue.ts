import { Queue } from '../packages/index';

describe('Queue', () => {
  test('Queue Methods', () => {
    const queue = new Queue()
    expect(queue.isEmpty()).toBe(true)
    queue.enqueue('john')
    queue.enqueue('jack')
    expect(queue.toString()).toBe('john,jack')
    queue.enqueue('camila')
    expect(queue.toString()).toBe('john,jack,camila')
    expect(queue.size()).toBe(3)
    expect(queue.isEmpty()).toBe(false)
    queue.dequeue()
    queue.dequeue()
    expect(queue.toString()).toBe('camila')
  });
});

// 作者：songjp
// 链接：https://juejin.cn/post/6950557086916804645
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。